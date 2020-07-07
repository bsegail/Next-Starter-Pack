import {set, unset} from "lodash";
import React from "react";

export type FormError = {
    message: string
}

type FieldDefinition = {
    type: string,
    component: React.ElementType,
    validation?: (value: any) => FormError | true
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

