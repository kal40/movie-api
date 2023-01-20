import httpStatus from "http-status";

import MovieService from "./movie.service.js";

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

const getMovieByTitle = async (req, res) => {
  const inputData = req.params;
  try {
    const response = await MovieService.getMovieByTitle(inputData);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Movie fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching movie: ${error}`,
    });
  }
};

const getGenreByName = async (req, res) => {
  const inputData = req.params;

  try {
    const response = await MovieService.getGenreByName(inputData);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Genre fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching genre: ${error}`,
    });
  }
};

const getDirectorByName = async (req, res) => {
  const inputData = req.params;

  try {
    const response = await MovieService.getDirectorByName(inputData);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Director fetched successfully",
      data: response,
    });
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
