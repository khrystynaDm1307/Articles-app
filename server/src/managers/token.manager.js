import jwt from "jsonwebtoken";
import { Token } from "../orm/models/index.js";
import { TOKEN_TYPES } from "../utills/constants/index.js";

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

class TokenManager {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "15d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(payload) {
    return Token.upsert(payload);
  }

  async removeToken(token) {
    return Token.destroy({ where: { token } });
  }

  async findToken(token) {
    return await Token.findOne({ where: { token } });
  }

  validateToken({ token, type }) {
    const secret =
      type === TOKEN_TYPES.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

    try {
      const userData = jwt.verify(token, secret);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenManager();
