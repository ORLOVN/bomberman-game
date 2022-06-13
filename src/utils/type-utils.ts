import { InferType, ObjectSchema } from "yup";
import { ObjectShape } from "yup/lib/object";

export type Nullish<T> = T | null;

export type FormValuesType<T extends ObjectSchema<ObjectShape>> = InferType<T>
