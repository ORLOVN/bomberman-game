import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ErrorResponse } from "@/types";

import UploadAvatar from "@/components/FormControls/UploadImage";
import { TextFormControl } from "@/components/FormControls";
import { NotificationService } from "@/components/ErrorHandler";

import { profileApiService } from "@/store";
import { UpdateUserResponse } from "@/store/apiServices/profile";

import { fields } from "./constants";
import { ProfileEditFormType, Props, UserInfoForm } from "./types";
import { ProfileEditSchema } from "./schemas";

export default function ProfileEditForm({ user }: Props) {
  const [updateAvatar] = profileApiService.useUpdateAvatarMutation();
  const [updateProfile] = profileApiService.useUpdateProfileMutation();

  const submitHanlder = (
    values: UserInfoForm,
    { setSubmitting }: FormikHelpers<UserInfoForm>
  ) => {
    const promises: Array<Promise<UpdateUserResponse>> = [];

    const hasProfileDataBeenChanged = (
      Object.entries(values.profile) as Array<
        [
          keyof typeof values.profile,
          typeof values.profile[keyof typeof values.profile]
        ]
      >
    ).some(([key, value]) => (user[key] || "") !== value);

    if (values.avatar instanceof File) {
      const data = new FormData();
      data.append("avatar", values.avatar);

      promises.push(updateAvatar(data).unwrap());
    }

    if (hasProfileDataBeenChanged) {
      promises.push(updateProfile(values.profile).unwrap());
    }

    setSubmitting(true);

    Promise.all(promises)
      .then(() => {
        NotificationService.notifySuccess(
          "User info has been updated successfully!"
        );
      })
      .catch((error: FetchBaseQueryError) => {
        NotificationService.notifyError((error.data as ErrorResponse).reason);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik<UserInfoForm>
      enableReinitialize
      initialValues={{
        profile: {
          first_name: user.first_name,
          second_name: user.second_name,
          display_name: user.display_name || "",
          login: user.login,
          email: user.email,
          phone: user.phone,
        },
        avatar: user.avatar,
      }}
      validationSchema={ProfileEditSchema}
      onSubmit={submitHanlder}
    >
      {({ values, dirty, isSubmitting, handleSubmit, isValid }) => (
        <Form onSubmit={handleSubmit}>
          <Flex w={624} mx="auto">
            <Box>
              <UploadAvatar name="avatar" image={values.avatar} />
            </Box>
            <Box w="100%" ml={16}>
              {fields.map(({ name, placeholder }) => (
                <TextFormControl<ProfileEditFormType>
                  key={name}
                  name={`profile.${name}`}
                  label={placeholder}
                  placeholder={placeholder}
                  component={Input}
                />
              ))}
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
      )}
    </Formik>
  );
}
