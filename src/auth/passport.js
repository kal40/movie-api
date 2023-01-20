import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import User from "../api/v1/user/user.model.js";
import config from "../config/config.js";

const jwtOptions = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  algorithms: config.algorithms,
};

// This verifies that the token sent by the user is valid
const getJWTStrategy = async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new JWTStrategy(jwtOptions, getJWTStrategy);

export default {
  jwtStrategy,
};
