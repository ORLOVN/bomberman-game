import React, { lazy, Suspense, useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Flex, Heading, Input, Textarea, Icon } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { BiSmile } from "react-icons/bi";

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

    const [showEmojies, setShowEmojies] = useState(false);

    const Picker = lazy(() => import('emoji-picker-react'));

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
                                    .notifyError((error.data as ErrorResponse).reason || 'An error occured!')
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
                        setFieldValue,
                        values,
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
                            <Flex
                                mt={4}
                                justifyContent="space-between"
                                alignItems="center"
                                position="relative"
                            >
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    isLoading={isSubmitting}
                                    disabled={!dirty || (dirty && !isValid) || isSubmitting}
                                >
                                    Create a topic
                                </Button>

                                <Button variant="ghost" onClick={() => setShowEmojies(prev => !prev)}>
                                    <Icon w={6} h={6} as={BiSmile} />
                                </Button>
                                <Box
                                    style={{bottom: '40px', right: 0, display: showEmojies ? 'block' : 'none'}}
                                    position="absolute"
                                >
                                    <Suspense fallback={<div />}>
                                        <Picker
                                            onEmojiClick={(_, emojiObject) => {
                                                setFieldValue('body', `${values.body}${emojiObject.emoji}`)
                                            }}
                                            disableAutoFocus
                                            native
                                        />
                                    </Suspense>
                                </Box>
                            </Flex>
                        </Form>
                    )
                }
            </Formik>
        </Box>
    );
}
