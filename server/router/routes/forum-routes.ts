import { Router} from 'express';
import { ForumAPI } from '../../db/controllers/forum-api';

export const forumRoutes = (router: Router) => {
  const forumRouter: Router = Router();

  forumRouter
    .post('/create-topic', [], ForumAPI.createTopic)
    .get('/topics', [], ForumAPI.findAllTopics)
    .get('/topics/:topicId', [], ForumAPI.findTopic)
    .post('/create-comment', [], ForumAPI.createComment);

  router.use('/my-api/v1/forum', forumRouter);
};
