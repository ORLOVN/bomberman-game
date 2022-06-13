import { Message } from "@/types";

export type CommentProps = {
    id: number;
    author: string;
    date: number;
    message: string;
    avatar: string;
    comments?: Omit<Message, 'comments'>[]
}
