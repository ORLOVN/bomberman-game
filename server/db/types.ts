import {ETheme} from './models/enum';

export interface IFindThemeRequest {
  yaId: number;
  theme: ETheme
}

export interface IFindTopicRequest {
  topicId: string;
}

export interface ICreateCommentRequest {
  body: string;
  parentCommentId: null | string;
  topicId: string;
  yaId: number;
}
