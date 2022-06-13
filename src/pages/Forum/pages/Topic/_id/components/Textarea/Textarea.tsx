import React from 'react';
import { Form, Formik } from 'formik';

import {
    Avatar,
    Box,
    Button,
    Flex,
    Text,
    Textarea as TextareaField
} from '@chakra-ui/react';

import { TextFormControl } from '@/components/FormControls';

import { SendMessageFormType, Props } from './types';
import { SendMessageSchema } from './schemas';

export default function Textarea({ onSubmit }: Props) {
    return (
        <Flex>
            <Avatar name="You" src="" />
            <Box flex='1'ml={2}>
                <Text mb={2} fontSize='sm' fontWeight='bold'>
                    You:
                </Text>
                <Formik
                    initialValues={{ body: '' } as SendMessageFormType}
                    validationSchema={SendMessageSchema}
                    onSubmit={
                        (values, { setSubmitting }) => onSubmit(setSubmitting, values)
                    }
                >
                {
                    ({
                    isSubmitting,
                    handleSubmit,
                    isValid,
                    dirty,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <TextFormControl<SendMessageFormType>
                                name='body'
                                placeholder='Type your reply here...'
                                showError={false}
                                component={TextareaField}
                            />
                            <Button
                                type="submit"
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                disabled={!dirty || (dirty && !isValid) || isSubmitting}
                            >
                                Send
                            </Button>
                        </Form>
                    )
                }
                </Formik>
            </Box>
        </Flex>
    );
}
