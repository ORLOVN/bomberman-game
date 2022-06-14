import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Heading, Input, Textarea } from '@chakra-ui/react';

import { TextFormControl } from '@/components/FormControls';

import { CreateTopicSchema } from './schemas';
import { CreateTopicFormType } from './types';

export default function CreateTopic() {
    return (
        <Box mt={4} w={1000} px="6" py="5">
            <Heading as='h2' size='lg' mb={4}>
                Create a new topic
            </Heading>
            <Formik
                initialValues={{ title: '', body: '' }}
                validationSchema={CreateTopicSchema}
                onSubmit={
                    (values, { setSubmitting }) => {
                        setSubmitting(true);
                        
                        setTimeout(() => {
                            console.log(values);
                            setSubmitting(false);
                        }, 1000);
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
