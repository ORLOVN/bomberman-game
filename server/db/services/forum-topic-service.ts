import { BaseRESTService } from "./base-rest-service";
import { Topics } from "../models/forum/topics";

export class ForumTopicService implements BaseRESTService {
  public find = async (topicId: string) => Topics.findOne({ where: { topicId } });
  public create = async (
    {yaId, title, body}:
    {yaId: number, title: string, body: string}
  ) => Topics.create({
    yaId,
    title,
    body,
  });
}
