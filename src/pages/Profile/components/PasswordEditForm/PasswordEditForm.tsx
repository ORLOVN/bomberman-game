import React from 'react';
import { Form, Formik, FormikHelpers } from "formik";
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { Button } from '@chakra-ui/react';

import { TextFormControl } from '@/components/FormControls';
import PasswordInput from '@/components/PasswordInput';

import { fields } from './constants';
import { PasswordEditSchema } from './schemas';
import { PasswordEditFormType } from './types';
import { profileApiService } from '@/store';
import { NotificationService } from '@/components/ErrorHandler';
import { ErrorResponse } from '@/types';

export default function PasswordEditForm() {
  const [ updatePassword ] = profileApiService.useUpdatePasswordMutation();

  const submitHanlder = (
		values: PasswordEditFormType,
		{ setSubmitting, resetForm }: FormikHelpers<PasswordEditFormType>
	) => {
		setSubmitting(true);

    updatePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      })
      .unwrap()
      .then(() => {
        resetForm();
        NotificationService.notifySuccess('Password has been updated successfully!');
      })
      .catch((error: FetchBaseQueryError) => {
        NotificationService.notifyError((error.data as ErrorResponse).reason)
      })
      .finally(() => {
        setSubmitting(false);
      })
	};

  return (
    <Formik
				initialValues={PasswordEditSchema.getDefault()}
				validationSchema={PasswordEditSchema}
				onSubmit={submitHanlder}
			>
        {
          ({ dirty, isSubmitting, handleSubmit, isValid }) => (
            <Form onSubmit={handleSubmit}>
              {
                fields.map(
                  ({ name, placeholder }) => (
                    <TextFormControl<PasswordEditFormType>
                      key={name}
                      name={name}
                      label={placeholder}
                      placeholder={placeholder}
                      component={PasswordInput}
                    />
                  )
                )
              }
              <Button
                mt={4}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
                disabled={!dirty || (dirty && !isValid) || isSubmitting}
              >
                  Update
              </Button>
            </Form>
          )
        }
      </Formik>
  );
}
