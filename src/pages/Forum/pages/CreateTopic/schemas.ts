import { object, string } from "yup";
import FormValidation from "@/services/form-validation-service";

const { errorMessage } = FormValidation;

export const CreateTopicSchema = object().shape({
  title: string().required(errorMessage.notEmpty),
  body: string().required(errorMessage.notEmpty),
});
