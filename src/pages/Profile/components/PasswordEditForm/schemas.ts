import { object, string, ref } from "yup";
import FormValidation from "@/services/form-validation-service";
import { transformForMessage } from "./utils";

const { regex, errorMessage } = FormValidation;

export const PasswordEditSchema = object().shape({
    oldPassword: string()
        .default('')
        .required(errorMessage.notEmpty)
        .matches(regex.password, errorMessage.password),
    newPassword: string()
        .default('')
        .required(errorMessage.notEmpty)
        .oneOf([ref("newPasswordRepeat")], transformForMessage(errorMessage.equal))
        .matches(regex.password, errorMessage.password),
    newPasswordRepeat: string()
        .default('')
        .required(errorMessage.notEmpty)
        .oneOf([ref("newPassword")], transformForMessage(errorMessage.equal))
        .matches(regex.password, errorMessage.password),
});
