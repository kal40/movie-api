import User from "./user.model.js";

import {
  generatePasswordHashFn,
  passwordMatchesFn,
} from "../../../auth/password-hashGen.js";
import { generateJWTToken } from "../../../auth/jwt-tokenGen.js";

const checkUserExist = async (username) => {
  const user = await User.findOne({ username: username });

  return user;
};

const createUser = async ({ username, password, email, birthday }) => {
  let hashedPassword = await generatePasswordHashFn(password);
  const createdUser = await User.create({
    username: username,
    password: hashedPassword,
    email: email,
    birthday: birthday,
  });
  return createdUser;
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username: username });
  await passwordMatchesFn(password, user.password);
  const accessToken = generateJWTToken(user);
  const response = {
    token: accessToken,
  };
  return response;
};

const getAllUsers = async () => {
  const foundUsers = await User.find({});

  const finalResult = foundUsers;

  return finalResult;
};

const getUserByUsername = async ({ username }) => {
  const foundUser = await User.findOne({ username: username });

  const finalResult = foundUser;

  return finalResult;
};

const updateUserDetails = async (
  { username, password, email, birthday },
  currentUsername
) => {
  const updatedUser = await User.findOneAndUpdate(
    { username: currentUsername },
    {
      $set: {
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      },
    },
    { new: true }
  );
  const finalResult = updatedUser;

  return finalResult;
};

const deleteUser = async ({ username }) => {
  const deletedUser = await User.findOneAndRemove({ username: username });

  const finalResult = deletedUser;

  return finalResult;
};

const addUserFavoriteMovie = async ({ username, movieId }) => {
  const updatedUser = await User.findOneAndUpdate(
    { username: username },
    {
      $push: { favoriteMovies: movieId },
    },
    { new: true }
  );
  const finalResult = updatedUser;

  return finalResult;
};

const deleteUserFavoriteMovie = async ({ username, movieId }) => {
  const updatedUser = await User.findOneAndUpdate(
    { username: username },
    {
      $pull: { favoriteMovies: movieId },
    },
    { new: true }
  );
  const finalResult = updatedUser;

  return finalResult;
};

export default {
  checkUserExist,
  createUser,
  loginUser,
  getAllUsers,
  getUserByUsername,
  updateUserDetails,
  deleteUser,
  addUserFavoriteMovie,
  deleteUserFavoriteMovie,
};
