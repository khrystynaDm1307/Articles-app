import Sequelize from "sequelize";
import database from "../db.js";

// Since the task did not assume a connection between the user and the post,
// for simplification we will consider the case that the admin and the posts are not connected

export const Post = database.getDB().define("Post", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creator: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  contentSnippet: {
    type: Sequelize.STRING(1000),
    defaultValue: "",
  },
  link: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  pubDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW(),
  },
});


