import React from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import { Form, Formik, FormikHelpers } from "formik";

import {
	Box,
	Button,
	Input
} from "@chakra-ui/react";

import { TextFormControl } from "@/components/FormControls";
import PasswordInput from "@/components/PasswordInput";
import { NotificationService } from "@/components/ErrorHandler";

import { fields } from './constants';
import { SignUpSchema } from "./schemas";
import { SignUpFormType } from "./types";

import { authApiService } from "@/store";
import { ErrorResponse } from "@/types";

export default function SignUp() {
	const [signUp] = authApiService.useSignUpMutation();

	const submitHandler = (
		values: SignUpFormType,
		{ setSubmitting }: FormikHelpers<SignUpFormType>
	) => {
		setSubmitting(true);

		const data = Object
			.keys(values)
			.filter((key) => key !== 'repeat_password')
			.reduce((result, key) => ({
				...result,
				[key]: values[key]
			}), {} as Omit<SignUpFormType, 'repeat_password'>);

		signUp(data)
			.unwrap()
			.catch((error: FetchBaseQueryError) => {
				NotificationService
					.notifyError((error.data as ErrorResponse).reason)
			})
			.finally(() => setSubmitting(false))

	};

	return (
		<Box mt={4} w={400}>
			<Formik
				initialValues={SignUpSchema.getDefault()}
				validationSchema={SignUpSchema}
				onSubmit={submitHandler}
			>
				{
					({ dirty, isSubmitting, handleSubmit, isValid }) => (
						<Form onSubmit={handleSubmit}>
							{fields.map(({ name, placeholder, secure }) => (
								<TextFormControl<SignUpFormType>
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
								Create an account
							</Button>
						</Form>
					)
				}
			</Formik>
		</Box>
	);
}
