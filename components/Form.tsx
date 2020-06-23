import React from 'react';
import {Field, FieldProps, Formik} from 'formik'
import { keyBy, map } from 'lodash';
import {FormikHelpers} from "formik/dist/types";
import uuid from 'uuid'

const Input: React.FC<{
    onChange: () => any,
    value: any,
    id: string
}> = ({ onChange, value, id }) => {
    return <div >
        <input id={id}type='text' onChange={onChange} value={value} />
    </div>
}

const FormikFieldWrapper: (ComponentToRender: React.FC<any>) => React.FC<FieldProps> = (ComponentToRender) => ({ field, form, meta }) => {
    return (
        <ComponentToRender {...field} {...form} {...meta} />
    )
}

export enum Fields {
    Input = 'Input'
}


type fieldMap = {
    [K in Fields]: React.FC<any>
}

const fieldTypes: fieldMap = {
    [Fields.Input]: Input
}


type FieldDefinition = {
    name: string,
    type: Fields,
    default?: any,
}

const Form: React.FC<{
    fields: FieldDefinition[],
    onSubmit: (fieldsWithValues: any) => any
}> = ({ fields, onSubmit, children }) => {

    const initialValues = map(keyBy(fields, 'name'), (field) => field.default || undefined )

    const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
        console.log('values', values)
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => {
                console.log('values', values)
                return (
              <form onSubmit={handleSubmit}>
                  {
                      map(fields, (field) => {
                          const Component = fieldTypes[field.type]
                          return <Component onChange={handleChange} id={1} />
                      })
                  }
                  { children }
              </form>
            )}}
        </Formik>
    )
}

export default Form
