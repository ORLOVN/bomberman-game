export type CreateTopicRequest = {
  title: string;
  body: string;
  yaId: number;
};

export type CreateCommentRequest = {
  yaId: number;
  topicId: string;
  parentCommentId: string | null;
  body: string;
};
