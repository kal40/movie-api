/* eslint-disable import/prefer-default-export */
import { initCors } from "./cors.js";
import { initBodyParser } from "./bodyparser.js";
import { initPassport } from "./passport.js";
import { initMorgan } from "./morgan.js";
import { initStatic } from "./static.js";

export const initMiddlewares = (app) => {
  initCors(app);
  initBodyParser(app);
  initPassport(app);
  initMorgan(app);
  initStatic(app);
};
