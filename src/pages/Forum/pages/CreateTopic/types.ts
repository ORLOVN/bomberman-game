import { InferType } from "yup";
import { CreateTopicSchema } from "./schemas";

export type CreateTopicFormType = InferType<typeof CreateTopicSchema>
