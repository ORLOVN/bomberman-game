import React from "react";
import { Form, Formik } from "formik";
import { object, string, ref, InferType } from "yup";

import {
	Box,
	Button,
	Input
} from "@chakra-ui/react";
import FormValidation from "@/services/form-validation-service";
import { TextFormControl } from "@/components/FormControls";
import fields from '@/constants/sign-up-page-const';
import PasswordInput from "@/components/PasswordInput";

const { regex, errorMessage } = FormValidation;

function transformForMessage(str: string) {
	return str.replace("fields", "'password' and 'repeat password' fields");
}

const SignUpSchema = object().shape({
	first_name: string()
		.required(errorMessage.notEmpty)
		.matches(regex.name, errorMessage.name),
	second_name: string()
		.required(errorMessage.notEmpty)
		.matches(regex.name, errorMessage.name),
	display_name: string()
		.required(errorMessage.notEmpty),
	login: string()
		.required(errorMessage.notEmpty)
		.matches(regex.login, errorMessage.login),
	email: string()
		.required(errorMessage.notEmpty)
		.matches(regex.email, errorMessage.email),
	phone: string()
		.required(errorMessage.notEmpty)
		.matches(regex.phone, errorMessage.phone),
	password: string()
		.required(errorMessage.notEmpty)
		.oneOf([ref("repeat_password")], transformForMessage(errorMessage.equal))
		.matches(regex.password, errorMessage.password),
	repeat_password: string()
		.required(errorMessage.notEmpty)
		.oneOf([ref("password")], transformForMessage(errorMessage.equal))
		.matches(regex.password, errorMessage.password),
});

type FormValuesType = InferType<typeof SignUpSchema>;

export default function SignUp() {
	return (
		<Box mt={4} w={400}>
			<Formik
				initialValues={{
					first_name: "",
					second_name: "",
					display_name: "",
					login: "",
					email: "",
					phone: "",
					password: "",
					repeat_password: "",
				}}
				validationSchema={SignUpSchema}
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
					({ dirty, isSubmitting, handleSubmit, isValid }) => (
						<Form onSubmit={handleSubmit}>
							{fields.map(({ name, placeholder, secure }) => (
								<TextFormControl<FormValuesType>
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
