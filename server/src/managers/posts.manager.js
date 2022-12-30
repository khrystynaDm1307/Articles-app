import Parser from "rss-parser";
import { Post } from "../orm/models/post.model.js";
import { PostDTO } from "../utills/dto/index.js";
import { uuid } from "uuidv4";
import { Op } from "sequelize";

const RSS_FEED = "https://lifehacker.com/rss";
const parser = new Parser();

class PostsManager {
  async fetchPosts() {
    const data = await parser.parseURL(RSS_FEED);
    const postsArray = data?.items?.map((post) => new PostDTO(post));

    // Another option to save only new posts: extract the
    // date of the last post from the database, and compare it to save only those that were published later
    return Post.bulkCreate(postsArray, { ignoreDuplicates: true });
  }

  async getPosts({ page, size, sort, search }) {
    const params = {
      order: [sort?.split("-") || ["pubDate", "DESC"]],
      ...(page && { offset: (Number(page) - 1) * Number(size) }),
      ...(size && { limit: Number(size) }),
      ...(search && {
        where: {
          [Op.or]: [
            {
              title: {
                [Op.substring]: search,
              },
            },
            {
              contentSnippet: {
                [Op.substring]: search,
              },
            },
          ],
        },
      }),
    };

    const posts = await Post.findAndCountAll(params);
    return posts;
  }

  async createPost(post) {
    return Post.create({ ...post, id: uuid() });
  }

  async editPost(post, id) {
    return Post.update(post, { where: { id } });
  }

  async deletePost(id) {
    // can be usefull to use paranoid models for soft deletion
    return Post.destroy({ where: { id } });
  }
}

export default new PostsManager();
