const config = {
  port: process.env.PORT,
  host: process.env.HOST,
  env: process.env.NODE_ENV || "production",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  algorithms: "HS256",
  mongodbConnectionUri: process.env.CONNECTION_URI,
};

export default config;
