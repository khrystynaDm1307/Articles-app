import Sequelize from "sequelize";
import config from "../config/index.js";

const { DATABASE_URL } = process.env;

const database = {
  _db: new Sequelize(DATABASE_URL, { logging: false }),

  getDB() {
    return this._db;
  },
};

export default database;
