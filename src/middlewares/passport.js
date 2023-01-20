/* eslint-disable import/prefer-default-export */
import passport from "passport";
import logger from "../utilities/logger.js";

import strategies from "../auth/passport.js";

export const initPassport = (app) => {
  logger.info("💻 SETUP - Installing Passport...");
  app.use(passport.initialize());
  passport.use("jwt", strategies.jwtStrategy);
};
