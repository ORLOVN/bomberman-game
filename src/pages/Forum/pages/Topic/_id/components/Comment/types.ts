import { Message } from "@/types";

export type CommentProps = {
  id: string;
  author: string;
  date: number;
  message: string;
  avatar: string;
  comments?: Omit<Message, "comments">[];
  isLoadingComments: boolean;
  commentsAmount: number;
  refetch: () => void;
};
