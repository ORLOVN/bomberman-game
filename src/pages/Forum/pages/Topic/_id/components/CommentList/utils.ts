import { Message } from "@/types";

export function hasNestedComments(value: unknown): value is Pick<Message, 'comments'> {
    return Object.hasOwnProperty.call(value, 'comments')
}
