import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Heading, Input, Textarea } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { TextFormControl } from '@/components/FormControls';
import { NotificationService } from '@/components/ErrorHandler';

import { useAppSelector } from '@/hooks';
import { forumApiService } from '@/store';
import { ErrorResponse } from "@/types";

import { CreateTopicSchema } from './schemas';
import { CreateTopicFormType } from './types';

export default function CreateTopic() {
    const user = useAppSelector((state) => state.auth.user);
    const [createTopicHanlder] = forumApiService.useCreateTopicMutation();

    return (
        <Box mt={4} w={1000} px="6" py="5">
            <Heading as='h2' size='lg' mb={4}>
                Create a new topic
            </Heading>
            <Formik
                initialValues={{ title: '', body: '' }}
                validationSchema={CreateTopicSchema}
                onSubmit={
                    (values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);

                        const data = {
                            ...values,
                            yaId: user.id
                        };

                        createTopicHanlder(data)
                            .unwrap()
                            .then(() => {
                                resetForm();
                                NotificationService.notifySuccess('The topic has been created successfully!');
                            })
                            .catch(
                                (error: FetchBaseQueryError) => NotificationService
                                    .notifyError((error.data as ErrorResponse).reason)
                            )
                            .finally(() => setSubmitting(false));
                    }
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
                            <TextFormControl<CreateTopicFormType>
                                name="title"
                                label="Title"
                                placeholder="Title"
                                component={Input}
                            />
                            <TextFormControl<CreateTopicFormType>
                                name="body"
                                label="Description"
                                placeholder="Description"
                                component={Textarea}
                            />
                            <Button
                                mt={4}
                                type="submit"
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                disabled={!dirty || (dirty && !isValid) || isSubmitting}
                            >
                                Create a topic
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </Box>
    );
}
