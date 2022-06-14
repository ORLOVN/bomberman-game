import React from 'react';
import { Form, Formik, FormikHelpers } from "formik";

import { Button } from '@chakra-ui/react';

import { TextFormControl } from '@/components/FormControls';
import PasswordInput from '@/components/PasswordInput';

import { fields } from './constants';
import { PasswordEditSchema } from './schemas';
import { PasswordEditFormType } from './types';

export default function PasswordEditForm() {
  const submitHanlder = (
		values: PasswordEditFormType,
		{ setSubmitting }: FormikHelpers<PasswordEditFormType>
	) => {
		setSubmitting(true);


		setTimeout(() => {
			console.log(values);
			setSubmitting(false);
		}, 1000);
	};

  return (
    <Formik
				initialValues={PasswordEditSchema.getDefault()}
				validationSchema={PasswordEditSchema}
				onSubmit={submitHanlder}
			>
        {
          ({ dirty, isSubmitting, handleSubmit, isValid }) => (
            <Form
              className="profile-form"
              onSubmit={handleSubmit}
            >
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
