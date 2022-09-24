import React from "react";

import { Box, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";

import { Form, Formik, FormikHelpers } from "formik";

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { TextFormControl } from "@/components/FormControls";
import PasswordInput from "@/components/PasswordInput";
import { NotificationService } from "@/components/ErrorHandler";

import fields from "./constants";
import { SignInSchema } from "./schemas";
import { SignInFormType } from "./types";

import { authApiService } from "@/store";
import { ErrorResponse } from "@/types";
import YaOAuthBtn from "./components/YaOAuthBtn/YaOAuthBtn";

export default function SignIn() {
  const [signIn] = authApiService.useSignInMutation();

  const submitHandler = (
    values: SignInFormType,
    { setSubmitting }: FormikHelpers<SignInFormType>
  ) => {
    setSubmitting(true);

    const data: SignInFormType = { ...values };

    signIn(data)
      .unwrap()
      .catch((error: FetchBaseQueryError) =>
        NotificationService.notifyError((error.data as ErrorResponse).reason)
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <Box mt={4} w={400}>
      <Formik
        initialValues={SignInSchema.getDefault()}
        validationSchema={SignInSchema}
        onSubmit={submitHandler}
      >
        {({ dirty, isSubmitting, handleSubmit, isValid }) => (
          <Form onSubmit={handleSubmit}>
            {fields.map(({ name, placeholder, secure }) => (
              <TextFormControl<SignInFormType>
                key={name}
                name={name}
                label={placeholder}
                placeholder={placeholder}
                component={secure ? PasswordInput : Input}
              />
            ))}
            <Flex direction="column" mt={12}>
              <Button
                borderRadius={12}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
                disabled={!dirty || (dirty && !isValid) || isSubmitting}
              >
                Sign in
              </Button>
              <Flex direction="row" alignItems="center" p={4}>
                <Divider borderColor="gray.300" />
                <Text mx={4} color="gray.500">
                  or
                </Text>
                <Divider borderColor="gray.300" />
              </Flex>
              <YaOAuthBtn />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
