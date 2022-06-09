import {
    ComponentWithAs,
    FormControl,
    FormErrorMessage,
    FormLabel,
    InputProps,
    TextareaProps
} from '@chakra-ui/react';
import { Field, FieldInputProps, FieldProps } from 'formik';
import React from 'react';
import { ObjectShape, TypeOfShape } from "yup/lib/object";

TextFormControl.defaultProps = {
    showError: true,
    label: ''
};

type ShapeType = TypeOfShape<ObjectShape>;

export default function TextFormControl<T extends ShapeType>({
    name,
    label,
    placeholder,
    component: Component,
    showError
}: {
    name: keyof T;
    label?: string;
    placeholder: string;
    component: ComponentWithAs<"input", InputProps>
                | ComponentWithAs<"textarea", TextareaProps>
                | ((props: FieldInputProps<ShapeType[keyof ShapeType]>) => JSX.Element),
    showError?: boolean
}) {
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
