import { object, string } from "yup";
import FormValidation from "@/services/form-validation-service";

const { regex, errorMessage } = FormValidation;

export const ProfileEditSchema = object().shape({
    profile: object().shape({
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
    })
});
