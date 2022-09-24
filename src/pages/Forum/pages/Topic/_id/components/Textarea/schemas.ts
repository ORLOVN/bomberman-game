import { object, string } from "yup";

export const SendMessageSchema = object().shape({
  body: string().required(),
});
