import { Message } from '@/types';

export type CommentsProps = {
    comments: (Message | Omit<Message, 'comments'>)[];
    isLoading: boolean;
    isNested?: boolean;
}
