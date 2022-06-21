import { InferType } from "yup";
import { SignInSchema } from "./schemas";

export type SignInFormType = InferType<typeof SignInSchema>;
