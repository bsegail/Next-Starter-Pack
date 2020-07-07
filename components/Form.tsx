import React, {FormEvent, useEffect, useMemo, useState} from 'react';
import {compact, map, values, keyBy, mapKeys, mapValues} from 'lodash'
import {FormError, formService} from "../services/form/FormService";

type FieldConsumer = {
    name: string,
    type: string,
    validation?: (value: any) => FormError | true
    props?: any
}


const availableFields = formService.fields

const Form: React.FC<{
    fields: FieldConsumer[],
    onSubmit: (values: any, errorState: any) => any
    onChange?: (changedValue: any, allValues: any, errorState: any) => any
}> = ({fields, onSubmit, onChange, children}) => {
    const getInitialFormState = useMemo(() => {
        const namedFields = keyBy(fields, 'name')
        const value = mapValues(namedFields, (field: any) => field.value)
        return value
    }, [])
    const [formState, setFormState] = useState<any>(getInitialFormState)
    const [errorState, setErrorState] = useState<{}>({})
    const [showErrors, setShowErrors] = useState(false)


    const handleChangeOfField = (name: string, value: any, formError?: FormError) => {
        setFormState(((prevState: any) => {
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
                        value={formState[field.name]}
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
    validation?: (value: any) => FormError | true,
    showErrors: boolean,
    value: any
}> = ({name, component: Component, onChange, value, validation, showErrors, props}) => {
    const [error, setError] = useState<FormError>()
    const handleChange = (v: any) => {
        let formError;
        if (validation) {
            const isValid = validation(v)
            formError = isValid !== true ? isValid : undefined
        }
        onChange(name, v, formError)
    }

    useEffect(() => {
        let formError;
        if (validation) {
            const isValid = validation(value)
            formError = isValid !== true ? isValid : undefined
        }
        setError(formError)
    }, [showErrors])


    return (
        <div>
            <Component onChange={handleChange} value={value} {...props} />
            {showErrors && <p>{error?.message}</p>}
        </div>
    )
}

export default Form
