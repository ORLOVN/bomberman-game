import { Router} from 'express';
import { ForumAPI } from 'server/db/controllers/forum-api';

export const forumRoutes = (router: Router) => {
  const forumRouter: Router = Router();

  forumRouter
    .post('/create-topic', [], ForumAPI.createTopic);

  router.use('/my-api/v1/forum', forumRouter);
};
