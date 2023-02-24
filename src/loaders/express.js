import { initMiddlewares } from "../middlewares/index.js";
import installApiEndpoints from "../api/routes/index.js";
// import { initializeErrorHandling } from "./error";

export default (app) => {
  app.set("trust proxy", true);
  app.disable("x-powered-by");
  initMiddlewares(app);

  app.use("/v1", installApiEndpoints);
  // initializeErrorHandling(app);

  return app;
};
