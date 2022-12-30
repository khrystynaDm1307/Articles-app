import express from "express";
import cors from "cors";

import database from "./src/orm/db.js";
import { handleErrors } from "./src/middleware/index.js";
import UsersRouter from "./src/routers/users.router.js";
import cookieParser from "cookie-parser";
import PostsRouter from "./src/routers/posts.router.js";
import CronJob from "node-cron";
import PostsController from "./src/controllers/posts.controller.js";

const { PORT = 4000, CLIENT_URL = "http://localhost:3000" } = process.env || {};

const routes = [
  { path: "/auth", router: UsersRouter.build() },
  { path: "/posts", router: PostsRouter.build() },
];

const start = async () => {
  try {
    const app = express();

    app.use(cors({ credentials: true, origin: CLIENT_URL }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    routes.forEach((route) => {
      app.use(route.path, route.router);
    });

    await database.getDB().authenticate();
    await database.getDB().sync();

    const scheduledJobFunction = CronJob.schedule("* * * * *", () => {
      PostsController.fetchPosts();
    });

    scheduledJobFunction.start();

    app.use(handleErrors);

    app.listen(PORT, () => {
      console.log(`Starting app server on ${PORT} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
