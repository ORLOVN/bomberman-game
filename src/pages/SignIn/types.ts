import { SignInSchema } from "./schemas";
import { InferType } from "yup";

export type SignInFormType = InferType<typeof SignInSchema>;
