import { object, string, ref } from "yup";
import FormValidation from "@/services/form-validation-service";
import { transformForMessage } from "./utils";

const { regex, errorMessage } = FormValidation;

export const PasswordEditSchema = object().shape({
    old_password: string()
        .default('')
        .required(errorMessage.notEmpty)
        .matches(regex.password, errorMessage.password),
    new_password: string()
        .default('')
        .required(errorMessage.notEmpty)
        .oneOf([ref("new_password_repeat")], transformForMessage(errorMessage.equal))
        .matches(regex.password, errorMessage.password),
    new_password_repeat: string()
        .default('')
        .required(errorMessage.notEmpty)
        .oneOf([ref("new_password")], transformForMessage(errorMessage.equal))
        .matches(regex.password, errorMessage.password),
});
