export type Message = {
  id: string;
  author: string;
  avatar: string | null;
  date: number;
  body: string;
  comments?: Omit<Message, "comments">[];
};

export type Topic = Omit<Message, "comments"> & {
  title: string;
  comments: Message[];
  commentsAmount: number;
};

export type TopicPreview = Omit<Topic, "comments"> & {
  commentsAmount: number;
};
