import { Message } from '@/types';

export type CommentsProps = {
    comments: (Message | Omit<Message, 'comments'>)[];
    commentsAmount: number;
    isLoadingComments: boolean;
    isNested?: boolean;
    refetch: () => void;
}
