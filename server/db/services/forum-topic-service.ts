import { BaseRESTService } from "./base-rest-service";
import { ITopic, Topics } from "../models/forum/topics";

export class ForumTopicService implements BaseRESTService {
  public find = async (topicId: string):
    Promise<
      ITopic & {createdAt: string, updatedAt: string}
    > => Topics.findOne({ where: { id: topicId } });
  public findAll = async ():
    Promise<
      ({dataValues: ITopic & {createdAt: string, updatedAt: string}})[]
    > => Topics.findAll();
  public create = async (
    {yaId, title, body}:
    {yaId: number, title: string, body: string}
  ) => Topics.create({
    yaId,
    title,
    body,
  });
}
