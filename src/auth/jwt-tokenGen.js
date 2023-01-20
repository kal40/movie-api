import jwt from "jsonwebtoken";

import config from "../config/config.js";

export const generateJWTToken = (user) => {
  return jwt.sign(user.toJSON(), config.jwtSecret, {
    subject: user.username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};
