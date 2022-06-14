import React from "react";
import { Form, Formik, FormikHelpers } from "formik";

import {
	Box,
	Button,
	Input
} from "@chakra-ui/react";

import { TextFormControl } from "@/components/FormControls";
import { fields } from './constants';
import PasswordInput from "@/components/PasswordInput";

import { SignUpSchema } from "./schemas";
import { SignUpFormType } from "./types";

export default function SignUp() {
	const submitHanlder = (
		values: SignUpFormType,
		{ setSubmitting }: FormikHelpers<SignUpFormType>
	) => {
		setSubmitting(true);


		setTimeout(() => {
			console.log(values);
			setSubmitting(false);
		}, 1000);
	};

	return (
		<Box mt={4} w={400}>
			<Formik
				initialValues={SignUpSchema.getDefault()}
				validationSchema={SignUpSchema}
				onSubmit={submitHanlder}
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
