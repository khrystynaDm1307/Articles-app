import UserManager from "../managers/user.manager.js";
import { signUpSchema } from "../utills/validators/index.js";

 class UserController {
  constructor() {
    this.usersManager = UserManager;
  }

  async signUp(req, res, next) {
    const { email, password } = req.body || {};

    try {
      const { error } = signUpSchema.validate({ email, password });
      if (error) {
        throw error;
      }

      await this.usersManager.signUp({ email, password });
      res.status(200).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body || {};

    try {
      const data = (await this.usersManager.login({ email, password })) || {};

      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json(data).end();
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    const { refreshToken } = req.cookies || {};

    try {
      await this.usersManager.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies || {};
      const data = await this.usersManager.refreshToken(refreshToken);

      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json(data).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
