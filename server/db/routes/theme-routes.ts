import {Router} from 'express';
import {ThemeAPI} from '../controllers/theme-api';

export const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router();

  themesRouter
    .get('/:yaId', [], ThemeAPI.find)
    .put('/', [], ThemeAPI.put);

  router.use('/my-api/v1/theme', themesRouter);
};
