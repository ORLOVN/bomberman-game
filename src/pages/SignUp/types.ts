import { InferType } from "yup";
import { SignUpSchema } from "./schemas";

export type SignUpFormType = InferType<typeof SignUpSchema>;
