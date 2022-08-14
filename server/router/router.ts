import { Router } from "express";
import {
    // themesRoutes,
    forumRoutes
} from "./routes";

const router: Router = Router();

// themesRoutes(router);
forumRoutes(router);

export default router;
