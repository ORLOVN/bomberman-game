import { object, string } from "yup";
import FormValidation from "@/services/form-validation-service";

const { regex, errorMessage } = FormValidation;

export const SignInSchema = object().shape({
  login: string()
    .default("")
    .required(errorMessage.notEmpty)
    .matches(regex.login, errorMessage.login),
  password: string()
    .default("")
    .required(errorMessage.notEmpty)
    .matches(regex.password, errorMessage.password),
});
