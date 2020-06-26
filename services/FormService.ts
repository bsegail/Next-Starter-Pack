import {set, unset} from "lodash";
import React from "react";
import Input from "../elements/Input";

export type FormError = {
    message: string
}

type FieldDefinition = {
    type: string,
    component: React.ElementType,
    validation?: (value: any) => FormError | undefined
}

class FormService {
    fields: { [key: string]: FieldDefinition } = {}

    registerFieldType(field: FieldDefinition) {
        set(this.fields, field.type, field)
    }

    deregisterFieldType(fieldType: string) {
        unset(this.fields, fieldType)
    }
}

export const formService = new FormService()

formService.registerFieldType({
    type: 'text',
    component: Input,
    validation: (myString: any) => {
        if (myString?.length < 8) {
            return { message: 'String must be > 8 characters' }
        }
    }
})
