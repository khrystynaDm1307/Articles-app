import { User } from "../orm/models/index.js";
import bcrypt from "bcrypt";
import TokenManager from "./token.manager.js";
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "../utills/errors/index.js";
import { UserDTO } from "../utills/dto/user.dto.js";
import { TOKEN_TYPES } from "../utills/constants/index.js";

 class UserManager {
  constructor() {
    this.tokenManager = TokenManager;
  }

  async signUp({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new ForbiddenError("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    await User.create({ email, password: hashPassword });
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      throw new BadRequestError("Password is wrong");
    }

    const userDTO = new UserDTO(user);

    const tokens = this.tokenManager.generateTokens({ ...userDTO });
    await this.tokenManager.saveToken({
      token: tokens.refreshToken,
      UserId: user.id,
    });

    return { ...tokens, user: userDTO };
  }

  async logout(refreshToken) {
    await this.tokenManager.removeToken(refreshToken);
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new UnauthorizedError();
    }

    const userData = await this.tokenManager.validateToken({
      token: refreshToken,
      type: TOKEN_TYPES.REFRESH,
    });

    const tokenData = await this.tokenManager.findToken(refreshToken);

    if (!userData || !tokenData) {
      throw new UnauthorizedError();
    }

    const user = await User.findByPk(userData.id);
    const userDTO = new UserDTO(user);

    const tokens = this.tokenManager.generateTokens({ ...userDTO });
    await this.tokenManager.saveToken({
      token: tokens.refreshToken,
      UserId: user.id,
    });

    return { ...tokens, user: userDTO };
  }
}

export default new UserManager();
