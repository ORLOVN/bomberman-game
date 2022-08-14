import { BaseRESTService } from "./base-rest-service";
import { User } from "../models/user";
import { ETheme } from "../models/enum";
import { Topics } from "../models/forum/topics";

export class ForumTopicService implements BaseRESTService {
  public find = async (topicId: string) => Topics.findOne({ where: { topicId } });
  public create = async ({yaId: number, title: string, body: string}) => {
    try {
      await Topics.create({
        yaId,
        title,
        body,
      })
    } catch (error) {
      throw Error('Error occured while creating topic')
    }

    return Promise.resolve({ theme: newTheme });
  };
}
