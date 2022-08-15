
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Avatar, FormControl, FormLabel, Icon, InputRightElement } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { Field, FieldProps } from 'formik';

import { ShapeType, Props } from './types';

export default function UploadImage<T extends ShapeType>({
    name,
    image,
} : Props) {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        if (image instanceof File) {
            setImageUrl(URL.createObjectURL(image));
        } else if (typeof image === 'string') {
            setImageUrl(`${process.env.API_URL}/resources${image}`);
        }
    }, [image]);

    return (
        <Field name={name}>
            {({ form: { setFieldValue } }: FieldProps<T[keyof T]>) => (
            <FormControl mb={6}>
                <FormLabel htmlFor='upload_image' m="0" cursor="pointer">
                    <Avatar w={40} h={40} src={imageUrl} />
                    <input
                        id='upload_image'
                        type='file'
                        accept="image/*"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const input = e.target as HTMLInputElement;
                            if (input.files?.length) {
                                const newImage = input.files[0];
                                setFieldValue(name, newImage);
                            }
                        }}
                        name={name}
                        hidden
                    />
                    <InputRightElement top="inherit" bottom={0}>
                        <Icon as={FaPlus} />
                    </InputRightElement>
                </FormLabel>
            </FormControl>
            )}
        </Field>
    );
}
