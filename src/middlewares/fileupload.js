import fileUpload from "express-fileupload";

export const initFileUpload = (app) => {
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    debug: true
  }))
};