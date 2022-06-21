import React from "react";

import {
  Box,
  Button,
  Input,
} from "@chakra-ui/react";


import {Form, Formik, FormikHelpers} from "formik";
import fields from "@/constants/sign-in-page-const";
import {TextFormControl} from "@/components/FormControls";
import PasswordInput from "@/components/PasswordInput";
import {NotificationService} from "@/components/ErrorHandler";

import { SignInSchema } from "./schemas";

import {SignInFormType} from "./types";

import { authApiService } from "@/store";

export default function SignIn() {

  const [signIn] = authApiService.useSignInMutation();

  const submitHandler = (
    values: SignInFormType,
    { setSubmitting }: FormikHelpers<SignInFormType>
  ) => {
    setSubmitting(true);

    const data: SignInFormType = {...values};

    signIn(data)
      .unwrap()
      .catch((error) => NotificationService.notifyError(JSON.parse(error.data).reason))
      .finally(() => setSubmitting(false))

  };

  return (
  <Box mt={4} w={400}>
    <Formik
      initialValues={SignInSchema.getDefault()}
      validationSchema={SignInSchema}
      onSubmit={ submitHandler }
    >
      {
        ({ dirty, isSubmitting, handleSubmit, isValid }) => (
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
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
              disabled={!dirty || (dirty && !isValid) || isSubmitting}
            >
              Sign in
            </Button>
          </Form>
        )
      }
    </Formik>
  </Box>
  );
}
