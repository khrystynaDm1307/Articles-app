import express from "express";
import PostsController from "../controllers/posts.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";

class PostsRouter {
  constructor() {
    this.postsController = PostsController;
  }

  _buildEndpoints(router) {
    router.get(
      "/",
      checkAuth,
      this.postsController.getPosts.bind(this.postsController)
    );
    router.post(
      "/",
      checkAuth,
      this.postsController.createPost.bind(this.postsController)
    );
    router.put(
      "/:id",
      checkAuth,
      this.postsController.editPost.bind(this.postsController)
    );
    router.delete(
      "/:id",
      checkAuth,
      this.postsController.deletePost.bind(this.postsController)
    );
  }

  build() {
    const router = express.Router({ mergeParams: true });

    this._buildEndpoints(router);

    return router;
  }
}

export default new PostsRouter();
