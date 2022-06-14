import { InferType } from "yup";
import { PasswordEditSchema } from "./schemas";

export type PasswordEditFormType = InferType<typeof PasswordEditSchema>;
