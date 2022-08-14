// import { ThemeService } from "../services/theme-service";
// import { IFindThemeRequest } from "../types";
// import {ETheme} from '../models/enum';
import {Request, Response} from 'express';
// import YaUserInfoAPI from "./ya-user-info-api";
// import { User } from "@/types";
import { ForumTopicService } from "../services/forum-topic-service";
// import { ForumCommentService } from "../services/forum-comment-service";
// import { Topics } from "../models/forum/topics";
import { Error } from "sequelize/types";

const forumTopicService = new ForumTopicService();
// const forumCommentService = new ForumCommentService();

export class ForumAPI {
  // public static findTopic = async (
  //   request: Request<IFindThemeRequest>,
  //   response: Response
  // ) => {
  //   const topic = await forumTopicService.find(request.params.topicId);

  //   if (!topic) {
  //     return response
  //       .status(404)
  //       .json({error: { message: 'The topic is not found'}})
  //   }

  //   let yaUser: Awaited<ReturnType<typeof YaUserInfoAPI.getInfo>>;

  //   try {
  //     yaUser = await YaUserInfoAPI.getInfo(
  //       topic.yaId,
  //       request.headers.cookie as string
  //     );
  //   } catch (error) {
  //     return response
  //       .status(404)
  //       .json({error: { message: `Error while user fetch: ${error}`}})
  //   }

  //   let commentsRaw;

  //   try {
  //     commentsRaw = await forumCommentService.find(request.params.topicId);
  //   } catch (error) {
  //     return response
  //       .status(404)
  //       .json({error: { message: `Error while comments fetch: ${error}`}});
  //   }

  //   const rootComments = [];
  //   const childComments = [];

  //   const commentAuthors: number[] = [];

  //   commentsRaw
  //     .forEach(c => {
  //       if (!commentAuthors.includes(c.yaId)) {
  //         commentAuthors.push(c.yaId);
  //       }
  //     })

  //   const fetchedAuthors = await Promise.all(
  //     commentAuthors.map(authorYaId => YaUserInfoAPI.getInfo(
  //       authorYaId,
  //       request.headers.cookie as string
  //     ))
  //   );
      
  //   const formatComment = (comment) => {
  //     const author = fetchedAuthors.find(author => author.id === comment.yaId);
  //     return {
  //       id: comment.commentId,
  //       parentCommentId: comment.parentCommentId,
  //       topicId: comment.topicId,
  //       author: author?.first_name,
  //       avatar: author?.avatar,
  //       date: comment.createdAt,
  //       body: comment.body,
  //     }
  //   }

  //   commentsRaw
  //     .forEach((c) => {
  //       (
  //         c.parentCommentId === null
  //           ? rootComments
  //           : childComments
  //       ).push(formatComment(c));
  //     })

  //   try {
  //     childComments.forEach(
  //       cc => {
  //         const rootComment = rootComments.find(
  //           (c) => c.id === cc.parentCommentId
  //         );

  //         if (!rootComment.comments) {
  //           rootComment.comments = [];
  //         }

  //         rootComment.comments.push(cc);
  //       }
  //     );
  //   } catch (error) {
  //     return response
  //       .status(404)
  //       .json({error: { message: `Error while creating comment structure: ${error}`}})
  //   }

  //   return response.status(200).json({
  //     id: topic.topicId,
  //     author: yaUser.first_name,
  //     avatar: yaUser.avatar,
  //     date: topic.createdAt,
  //     title: topic.title,
  //     body: topic.body,
  //     comments: rootComments,
  //     commentsAmount: commentsRaw.length
  //   });
  // }

  public static createTopic = async (request: Request, response: Response) => {
    const {
      yaId,
      title,
      body
    } = request.body;

    return forumTopicService.create({
      yaId,
      title,
      body
    }).then(() => response.status(200))
      .catch((error: Error) => response.status(400)
        .json({
          error: {
            message: `Error occured while creating topic: ${error.message}`
          }
        })
      )
  }
}
