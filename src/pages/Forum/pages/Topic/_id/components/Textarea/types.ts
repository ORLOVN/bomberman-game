import { InferType } from "yup"

import { SendMessageSchema } from './schemas';

export type SendMessageFormType = InferType<typeof SendMessageSchema>

export type Props = {
    onSubmit: (
        setSubmitting: (isSubmitting: boolean) => void,
        values: SendMessageFormType
    ) => void
}
