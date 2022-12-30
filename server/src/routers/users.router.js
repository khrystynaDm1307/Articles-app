import express from "express";
import UserController from "../controllers/users.controller.js";

class UsersRouter {
  constructor() {
    this.userController = UserController;
  }

  _buildEndpoints(router) {
    router.post(
      "/signup",
      this.userController.signUp.bind(this.userController)
    );
    router.post("/login", this.userController.login.bind(this.userController));
    router.get(
      "/refresh",
      this.userController.refreshToken.bind(this.userController)
    );
    router.post(
      "/logout",
      this.userController.logout.bind(this.userController)
    );
  }

  build() {
    const router = express.Router({ mergeParams: true });

    this._buildEndpoints(router);

    return router;
  }
}

export default new UsersRouter();
