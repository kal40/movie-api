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
  .route("/:movieId/userimages/:userId")
  .get(authorizeJWT, MovieController.getMovieUserImageList);

movieRouter
  .route("/userimages/:objectKey")
  .get(authorizeJWT, MovieController.getMovieUserImage);

movieRouter
  .route("/:movieId/userimages/:userId")
  .post(authorizeJWT, MovieController.addMovieUserImages);

export default movieRouter;
