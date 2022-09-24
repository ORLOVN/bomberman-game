import { BaseRESTService } from "./base-rest-service";
import { Comments, IComment } from "../models/forum/comments";
import { ICreateCommentRequest } from "../types";

export class ForumCommentService implements BaseRESTService {
  public findByTopicId = async (
    topicId: string
  ): Promise<
    { dataValues: IComment & { createdAt: string; updatedAt: string } }[]
  > => Comments.findAll({ where: { topicId } });
  public findAll = async (): Promise<
    { dataValues: IComment & { createdAt: string; updatedAt: string } }[]
  > => Comments.findAll();
  public create = async ({
    yaId,
    body,
    parentCommentId,
    topicId,
  }: ICreateCommentRequest) =>
    Comments.create({
      yaId,
      body,
      parentCommentId,
      topicId,
    });
}
