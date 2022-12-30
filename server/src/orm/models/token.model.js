import Sequelize from "sequelize";
import database from "../db.js";
import { User } from "./index.js";

export const Token = database.getDB().define("Token", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// In theory, a user can have many refresh tokens for different devices,
// but in this case, for simplicity, we will assume that the user
// can only be logged in on one device
User.hasOne(Token, {
  onDelete: "CASCADE",
});

Token.belongsTo(User);
