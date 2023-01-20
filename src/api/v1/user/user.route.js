/* eslint-disable import/no-cycle */
import { Router } from "express";

import UserController from "./user.controller.js";
import { userValidationSchema, validateUser } from "./user.validation.js";
import { authorizeJWT } from "../../../auth/auth.js";

const userRouter = Router();

userRouter.route("/login").post(UserController.loginUser);
userRouter
  .route("/")
  .post(userValidationSchema, validateUser, UserController.createUser)
  .get(authorizeJWT, UserController.getAllUsers);
userRouter
  .route("/:username")
  .get(authorizeJWT, UserController.getUserByUsername)
  .put(
    authorizeJWT,
    userValidationSchema,
    validateUser,
    UserController.updateUserDetails
  )
  .delete(authorizeJWT, UserController.deleteUser);
userRouter
  .route("/:username/movies/:movieId")
  .post(authorizeJWT, UserController.addUserFavoriteMovie)
  .delete(authorizeJWT, UserController.deleteUserFavoriteMovie);

export default userRouter;
