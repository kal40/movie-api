/* eslint-disable import/no-cycle */
import { Router } from "express";

import MovieController from "./movie.controller.js";
import { authorizeJWT } from "../../../auth/auth.js";

const movieRouter = Router();

movieRouter.route("/").get(authorizeJWT, MovieController.getAllMovies);

movieRouter.route("/:title").get(authorizeJWT, MovieController.getMovieByTitle);

movieRouter
  .route("/genres/:genreName")
  .get(authorizeJWT, MovieController.getGenreByName);

movieRouter
  .route("/directors/:directorName")
  .get(authorizeJWT, MovieController.getDirectorByName);

movieRouter
  .route("/:title/userimages/:username")
  .get(MovieController.getMovieUserImageList);

movieRouter
  .route("/:title/userimages/:username/:filename")
  .get(MovieController.getMovieUserImage);

movieRouter
  .route("/:title/userimages/:username/:filename")
  .post(MovieController.addMovieUserImages);

export default movieRouter;
