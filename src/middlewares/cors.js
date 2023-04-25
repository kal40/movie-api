/* eslint-disable no-useless-concat */
/* eslint-disable import/prefer-default-export */
import cors from "cors";

const ALLOWED_ORIGINS = [
  "https://myflix.smartcoder.dev",
  "https://myflixang.smartcoder.dev",
  "https://myflixapi.smartcoder.dev",
  "http://localhost:3000",
  "http://localhost:1234",
  "http://localhost:4200",
];

export const initCors = (app) => {
  app.use(
    cors({
      credentials: true, // include Access-Control-Allow-Credentials: true. remember set xhr.withCredentials = true;
      origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
          const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );
};
