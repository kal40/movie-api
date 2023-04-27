import httpStatus from "http-status";

import MovieService from "./movie.service.js";

/**
 * @typedef {Object} Response
 * @property {boolean} success - whether the request was successful
 * @property {string} message - response message
 * @property {Object} data - response data
 */

/**
 * get all movies from the database
 * @async
 * @returns {Response} returns a response object
 */

const getAllMovies = async (req, res) => {
  try {
    const response = await MovieService.getAllMovies();
    res.status(httpStatus.OK).json({
      success: true,
      message: "All movies fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching all movies: ${error}`,
    });
  }
};

/**
 * get movie by title from the database
 * @async
 * @returns {Response} returns a response object
 */

const getMovieByTitle = async (req, res) => {
  const inputData = req.params;
  try {
    const response = await MovieService.getMovieByTitle(inputData);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No movie with that title" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Movie fetched successfully",
        data: response,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching movie: ${error}`,
    });
  }
};

/**
 * get genre by name from the database
 * @async
 * @returns {Response} returns a response object
 */

const getGenreByName = async (req, res) => {
  const inputData = req.params;

  try {
    const response = await MovieService.getGenreByName(inputData);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No genre with that name" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Genre fetched successfully",
        data: response.genre,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching genre: ${error}`,
    });
  }
};

/**
 * get director by name from the database
 * @async
 * @returns {Response} returns a response object
 */

const getDirectorByName = async (req, res) => {
  const inputData = req.params;

  try {
    const response = await MovieService.getDirectorByName(inputData);
    if (!response) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: true, message: "No director with that name" });
    } else {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Director fetched successfully",
        data: response.director,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching director: ${error}`,
    });
  }
};

export default {
  getAllMovies,
  getMovieByTitle,
  getGenreByName,
  getDirectorByName,
};
