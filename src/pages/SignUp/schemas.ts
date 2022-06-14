import { object, string, ref } from "yup";
import FormValidation from "@/services/form-validation-service";
import { transformForMessage } from "./utils";

const { regex, errorMessage } = FormValidation;

export const SignUpSchema = object().shape({
	first_name: string()
        .default('')
		.required(errorMessage.notEmpty)
		.matches(regex.name, errorMessage.name),
	second_name: string()
        .default('')
		.required(errorMessage.notEmpty)
		.matches(regex.name, errorMessage.name),
	display_name: string()
        .default('')
		.required(errorMessage.notEmpty),
	login: string()
        .default('')
		.required(errorMessage.notEmpty)
		.matches(regex.login, errorMessage.login),
	email: string()
        .default('')
		.required(errorMessage.notEmpty)
		.matches(regex.email, errorMessage.email),
	phone: string()
        .default('')
		.required(errorMessage.notEmpty)
		.matches(regex.phone, errorMessage.phone),
	password: string()
        .default('')
		.required(errorMessage.notEmpty)
		.oneOf([ref("repeat_password")], transformForMessage(errorMessage.equal))
		.matches(regex.password, errorMessage.password),
	repeat_password: string()
        .default('')
		.required(errorMessage.notEmpty)
		.oneOf([ref("password")], transformForMessage(errorMessage.equal))
		.matches(regex.password, errorMessage.password),
});
