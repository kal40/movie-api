import httpStatus from "http-status";

import UserService from "./user.service.js";

const createUser = async (req, res) => {
  const inputData = req.body;
  try {
    const user = await UserService.checkUserExist(inputData.username);
    if (user) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "User already exists" });
    } else {
      const createdUser = await UserService.createUser(inputData);
      res.status(httpStatus.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: createdUser,
      });
    }
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "Error Creating User", Error: error });
  }
};

const loginUser = async (req, res) => {
  const inputData = req.body;
  try {
    const user = await UserService.checkUserExist(inputData.username);
    if (!user) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No user with that username" });
    } else {
      const newUserAccessToken = await UserService.loginUser(inputData);
      res.status(httpStatus.OK).json({
        success: true,
        message: "User logged in successsfully",
        data: newUserAccessToken,
      });
    }
  } catch (error) {
    console.trace(error);
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: "Error login User" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    res.status(httpStatus.OK).json({
      success: true,
      message: "All users fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching all users: ${error}`,
    });
  }
};

const getUserByUsername = async (req, res) => {
  const inputData = req.params;
  try {
    const response = await UserService.getUserByUsername(inputData);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No user with that username" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "User fetched successfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching user: ${error}`,
    });
  }
};

const updateUserDetails = async (req, res) => {
  const inputData = req.body;
  const { username } = req.params;
  try {
    const response = await UserService.updateUserDetails(inputData, username);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No user with that username" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "User updated successfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred updating user: ${error}`,
    });
  }
};

const deleteUser = async (req, res) => {
  const inputData = req.params;
  try {
    const response = await UserService.deleteUser(inputData);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No user with that username" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "User deleted successfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred deleting user: ${error}`,
    });
  }
};

const addUserFavoriteMovie = async (req, res) => {
  const inputData = req.params;
  try {
    const response = await UserService.addUserFavoriteMovie(inputData);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No user with that username" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Movie added to user's favorites successfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred adding movie to user's favorites: ${error}`,
    });
  }
};

const deleteUserFavoriteMovie = async (req, res) => {
  const inputData = req.params;
  try {
    const response = await UserService.deleteUserFavoriteMovie(inputData);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No user with that username" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Movie deleted from user's favorites successfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred deleting movie from user's favorites: ${error}`,
    });
  }
};

export default {
  createUser,
  loginUser,
  getAllUsers,
  getUserByUsername,
  updateUserDetails,
  deleteUser,
  addUserFavoriteMovie,
  deleteUserFavoriteMovie,
};
