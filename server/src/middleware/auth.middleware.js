import  TokenManager  from "../managers/token.manager.js";
import { TOKEN_TYPES } from "../utills/constants/index.js";
import { UnauthorizedError } from "../utills/errors/index.js";


export const checkAuth = (req, res, next) => {
  try {
    const accessToken = req.headers?.authorization?.split(" ")[1];

    if (!accessToken) {
      throw new UnauthorizedError();
    }
    
    const userData = TokenManager.validateToken({
      token: accessToken,
      type: TOKEN_TYPES.ACCESS,
    });

    if (!userData) {
      throw new UnauthorizedError();
    }

    req.user = userData;
    next();
  } catch (e) {
    next(new UnauthorizedError());
  }
};
