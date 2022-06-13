export type Message = {
    id: number;
    author: string;
    avatar: string | null;
    date: number;
    body: string;
    comments: Omit<Message, 'comments'>[]
}

export type Topic = Omit<Message, 'comments'> & {
    title: string;
    comments: Message[]
};

export type TopicPreview = Omit<Topic, 'comments'> & {
    commentsAmount: number;
};
