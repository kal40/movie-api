/* eslint-disable import/prefer-default-export */
import expressLoader from "./express.js";

import "./database.js";

export const appInitLoader = (app) => {
  expressLoader(app);
};
