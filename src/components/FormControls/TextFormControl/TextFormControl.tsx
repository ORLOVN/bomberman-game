import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';

import { Props, ShapeType } from './types';

export default function TextFormControl<T extends ShapeType>({
    name,
    label = '',
    placeholder,
    component: Component,
    showError = true
}: Props<T>) {
    return (
        <Field name={name}>
            {({ field, meta }: FieldProps<T[keyof T]>) => (
            <FormControl
                {
                    ...(
                        showError
                        ? {'isInvalid': Boolean(meta.touched && meta.error)}
                        : {}
                    )
                }
                mb={6}
            >
                {label && <FormLabel>{label}</FormLabel>}
                <Component
                    {...field}
                    placeholder={placeholder}
                />
                {showError && <FormErrorMessage>{meta.error}</FormErrorMessage>}
            </FormControl>
            )}
        </Field>
    );
}
