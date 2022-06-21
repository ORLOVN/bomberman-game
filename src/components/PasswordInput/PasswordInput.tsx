import React from 'react';
import {
    InputGroup,
    Input,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import { FieldInputProps } from 'formik';
import { ObjectShape, TypeOfShape } from "yup/lib/object";

type ShapeType = TypeOfShape<ObjectShape>;

export default function PasswordInput(
    props: FieldInputProps<ShapeType[keyof ShapeType]>
) {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup size='md'>
            <Input
                {...props}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}
