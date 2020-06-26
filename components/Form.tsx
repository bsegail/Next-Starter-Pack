import React, {FormEvent, useEffect, useState} from 'react';
import {compact, map, values} from 'lodash'
import {FormError, formService} from "../services/FormService";

type FieldConsumer = {
    name: string,
    type: string,
    validation?: (value: any) => FormError | undefined
    props?: any
}


const availableFields = formService.fields

const Form: React.FC<{
    fields: FieldConsumer[],
    onSubmit: (values: any, errorState: any) => any
    onChange?: (changedValue: any, allValues: any, errorState: any) => any
}> = ({fields, onSubmit, onChange, children}) => {
    const [formState, setFormState] = useState({})
    const [errorState, setErrorState] = useState<{}>({})
    const [showErrors, setShowErrors] = useState(false)

    const handleChangeOfField = (name: string, value: any, formError?: FormError) => {
        setFormState((prevState => {
            return {...prevState, [name]: value}
        }))
        setErrorState((prevState => {
            if (formError?.message) {
                return {...prevState, [name]: formError?.message}
            } else {
                const {[name]: itemToRemove, ...newFormState} = errorState as any
                return {...newFormState}
            }
        }))
        onChange && onChange({[name]: value}, formState, errorState)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(errorState)
        if (compact(values(errorState)).length === 0) {
            onSubmit(formState, errorState)
            setShowErrors(false)
        } else {
            setShowErrors(true)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                map(fields, (field: FieldConsumer) => (
                    <Field
                        key={field.name}
                        onChange={handleChangeOfField}
                        showErrors={showErrors}
                        {...availableFields[field.type]}
                        {...field}
                    />
                ))
            }
            {children}
        </form>
    )
}

const Field: React.FC<FieldConsumer & {
    component: React.ElementType
    onChange: (name: string, value: any, error?: FormError) => any,
    validation?: (value: any) => FormError | undefined,
    showErrors: boolean
}> = ({name, component: Component, onChange, validation, showErrors, props}) => {
    const [value, setValue] = useState()
    const [error, setError] = useState<FormError>()
    const handleChange = (v: any) => {
        let formError;
        if (validation) {
            formError = validation(v)
        }
        setValue(v)
        onChange(name, v, formError)
    }

    useEffect(() => {
        let formError;
        if (validation) {
            formError = validation(value)
        }
        setError(formError)
    }, [showErrors])


    return (
        <div>
            <Component onChange={handleChange} {...props} />
            {showErrors && <p>{error?.message}</p>}
        </div>
    )
}

export default Form
