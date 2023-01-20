/* eslint-disable import/prefer-default-export */
import bodyParser from "body-parser";

export const initBodyParser = (app) => {
  app.use(bodyParser.json()); // parse body params and attach them to req.body
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
};
