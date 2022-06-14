import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';

import { Box, Button, Flex, Input } from '@chakra-ui/react';
import UploadAvatar from '@/components/FormControls/UploadImage';

import { TextFormControl } from '@/components/FormControls';
import { fields } from './constants';
import { ProfileEditFormType, Props, UserInfoForm } from './types';
import { ProfileEditSchema } from './schemas';

export default function ProfileEditForm({ user }: Props) {

  const submitHanlder =  (
    values: UserInfoForm,
    { setSubmitting }: FormikHelpers<UserInfoForm>
  ) => {
      const promises: Array<Promise<UserInfoForm[keyof UserInfoForm]>> = [];

      const hasProfileDataBeenChanged = (
          Object
              .entries(values.profile) as Array<
              [
                  keyof typeof values.profile,
                  typeof values.profile[keyof typeof values.profile]
              ]
          >
      ).some(([key, value]) => (user[key] || '') !== value);

      const mockRequest = (
          value: UserInfoForm[keyof UserInfoForm]
      ): Promise<UserInfoForm[keyof UserInfoForm]> => new Promise((resolve) => {
          setTimeout(() => {
              resolve(value)
          }, 1000)
      });

      if (values.avatar instanceof File) {
          promises.push(mockRequest(values.avatar));
      }

      if (hasProfileDataBeenChanged) {
          promises.push(mockRequest(values.profile));
      }

      setSubmitting(true);

      Promise
          .all(promises)
          .then((response) => {
              console.log(response);
          })
          .catch((e) => {
              console.log('Error while updating profile', e);
          })
          .finally(() => {
              setSubmitting(false);
          });
  }

  return (
    <Formik<UserInfoForm>
      initialValues={
        {
          profile: {
            first_name: user.first_name,
            second_name: user.second_name,
            display_name: user.display_name || '',
            login: user.login,
            email: user.email,
            phone: user.phone,
          },
          avatar: user.avatar,
        }
      }
      validationSchema={ProfileEditSchema}
      onSubmit={submitHanlder}
    >
      {
        ({
          values,
          dirty,
          isSubmitting,
          handleSubmit,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Flex w={624} mx="auto">
              <Box>
                <UploadAvatar
                  name="avatar"
                  image={values.avatar}
                />
              </Box>
              <Box w="100%" ml={16}>
                {
                  fields.map(({ name, placeholder }) => (
                    <TextFormControl<ProfileEditFormType>
                      key={name}
                      name={`profile.${name}`}
                      label={placeholder}
                      placeholder={placeholder}
                      component={Input}
                    />
                  ))
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
              </Box>
            </Flex>
          </Form>
        )
      }
    </Formik>
  );
}
