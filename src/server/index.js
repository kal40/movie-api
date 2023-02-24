import express from "express";

import { appInitLoader } from "../loaders/index.js";
import config from "../config/config.js";
import logger from "../utilities/logger.js";

const app = express();

appInitLoader(app);
app.listen(config.port, () => {
  logger.info(
    `Server is running on ${config.host}:${config.port} in ${config.env} mode.`
  );
});
