import PostsManager from "../managers/posts.manager.js";
import { postSchema } from "../utills/validators/posts/create-post.js";

class PostsController {
  constructor() {
    this.postsManager = PostsManager;
  }

  async fetchPosts() {
    try {
      await this.postsManager.fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(req, res, next) {
    const { page, size, search, sort } = req.query || {};

    try {
      const data = await this.postsManager.getPosts({
        page,
        size,
        search,
        sort,
      });
      res.status(201).json(data).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createPost(req, res, next) {
    const { post } = req.body || {};

    try {
      const { error } = postSchema.validate(post);
      if (error) {
        throw error;
      }
      const data = await this.postsManager.createPost(post);
      res.status(201).json(data).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async editPost(req, res, next) {
    const { post } = req.body || {};
    const { id } = req.params || {};

    try {
      const { error } = postSchema.validate(post);
      if (error) {
        throw error;
      }
      const data = await this.postsManager.editPost(post, id);
      res.status(201).json(data).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deletePost(req, res, next) {
    const { id } = req.params || {};

    try {
      await this.postsManager.deletePost(id);
      res.status(200).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new PostsController();
