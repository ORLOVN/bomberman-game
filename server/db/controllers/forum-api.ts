import {Request, Response} from 'express';
import { User } from '@/types';
import { ForumCommentService } from "../services/forum-comment-service";
import { Error } from "sequelize/types";
import { ForumTopicService } from "../services/forum-topic-service";
import YaUserInfoAPI from './ya-user-info-api';
import { ICreateCommentRequest, IFindTopicRequest } from '../types';
import { IComment } from '../models/forum/comments';

const forumTopicService = new ForumTopicService();
const forumCommentService = new ForumCommentService();

interface ITransformedComment {
  id: string;
  topicId: string;
  parentCommentId: string | null;
  author: string;
  avatar: string;
  body: string;
  date: string;
}

export class ForumAPI {
  public static findTopic = async (
    request: Request<IFindTopicRequest>,
    response: Response
  ) => {
    return forumTopicService.find(request.params.topicId)
      .then(async (topic) => {
        if (!topic) {
          return response
            .status(404)
            .json({error: { message: 'The topic is not found'}})
        }
        const yaUser = await YaUserInfoAPI.getInfo(
          topic.yaId,
          request.cookies
        );

        const comments = (await forumCommentService.findByTopicId(request.params.topicId))
          .map(t => t.dataValues);

        const yaIds = comments.reduce((acc, comment) => {
          if (!acc.includes(comment.yaId)) {
            acc.push(comment.yaId)
          }
          return acc;
        }, [] as number[]);

        const yaUsers = await Promise.all(
          yaIds.map(authorYaId => YaUserInfoAPI.getInfo(
            authorYaId,
            request.cookies
          ))
        );

        const yaUsersMap = yaUsers.reduce((result, yaUser) => {
          result[`${yaUser.id}`] = yaUser;
          return result
        }, {} as Record<string, User>);

        const formatComment = (comment: IComment & {createdAt: string, updatedAt: string}): ITransformedComment => ({
          id: comment.id,
          topicId: comment.topicId,
          parentCommentId: comment.parentCommentId,
          author: yaUsersMap[`${comment.yaId}`].first_name,
          avatar: yaUsersMap[`${comment.yaId}`].avatar,
          body: comment.body,
          date: comment.createdAt,
        });

        const rootComments:
          (ReturnType<typeof formatComment>
            & {comments?: ReturnType<typeof formatComment>[]})[] = [];

        const childComments: (ReturnType<typeof formatComment>)[] = [];

        comments
          .forEach((c) => {
            (c.parentCommentId === null ? rootComments : childComments).push(formatComment(c));
          });

        rootComments.forEach(rootComment => {
          rootComment.comments = [];
        });
        
        childComments.forEach(
          cc => {
            const rootComment = rootComments.find(
              (c) => c.id === cc.parentCommentId
            );

            rootComment && rootComment.comments!.push(cc);
          }
        );


        return response.status(200).json({
          id: topic.id,
          author: yaUser.first_name,
          avatar: yaUser.avatar,
          date: topic.createdAt,
          title: topic.title,
          body: topic.body,
          comments: rootComments,
          commentsAmount: comments.length
        });

      })
      .catch((error: Error) => response.status(400)
        .json({
          error: {
            message: `Error occured while fetching topic: ${error.message}`
          }
        })
      );
  }

  public static findAllTopics = async (
    request: Request,
    response: Response
  ) => {
    return forumTopicService.findAll()
      .then(async (res) => {
        const topics = res.map(t => t.dataValues);

        const yaIds = topics.reduce((acc, topic) => {
          if (!acc.includes(topic.yaId)) {
            acc.push(topic.yaId)
          }
          return acc;
        }, [] as number[]);

        const yaUsers = await Promise.all(
          yaIds.map(
            yaId => YaUserInfoAPI.getInfo(
              yaId,
              request.cookies
            )
          )
        );

        const yaUsersMap = yaUsers.reduce((result, yaUser) => {
          result[`${yaUser.id}`] = yaUser;
          return result
        }, {} as Record<string, User>);

        let comments = await forumCommentService.findAll();

        return response.status(200).json(topics.map(t => ({
          id: t.id,
          author: yaUsersMap[`${t.yaId}`].first_name,
          avatar: yaUsersMap[`${t.yaId}`].avatar,
          date: t.createdAt,
          body: t.body,
          title: t.title,
          commentsAmount: comments.length,
        })))
      })
      .catch((error: Error) => response.status(400)
        .json({
          error: {
            message: `Error occured while fetching topics: ${error.message}`
          }
        })
      )
  }

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
    }).then(() => response.status(200).json())
      .catch((error: Error) => response.status(400)
        .json({
          error: {
            message: `Error occured while creating topic: ${error.message}`
          }
        })
      )
  }

  public static createComment = async (request: Request<ICreateCommentRequest>, response: Response) => {
    const {topicId, parentCommentId, yaId, body} = request.body;

    return forumCommentService.create({
        yaId,
        body,
        parentCommentId,
        topicId,
      })
      .then(() => response.status(200).json())
      .catch((error: Error) => response.status(400)
          .json({
            error: {
              message: `Error occured while creating comment: ${error.message}`
            }
          })
        );
  }
}
