import httpStatus from "http-status";
import fs from "fs";
import sanitize from "sanitize-s3-objectkey";

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

const getMovieUserImageList = async (req, res) => {
  const inputData = req.params;

  try {
    const response = await MovieService.getMovieUserImageList(inputData);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Object list fetched successfully",
        data: response,
      });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching file list. ${error}`,
    });
  }
};

const getMovieUserImage = async (req, res) => {
  const {objectKey} = req.params;
  const fileName = objectKey.split("/").pop();
  console.log(objectKey, fileName);
  try {
    const response = await MovieService.getMovieUserImage(objectKey);
    const stream = response.Body;
    fs.writeFileSync(`/tmp/${fileName}`, Buffer.concat(await stream.toArray()));
+     res.status(httpStatus.OK).sendFile(`/tmp/${fileName}`);
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred during fetching file. ${error}`,
    });
  }
};

const addMovieUserImages = async (req, res) => {
  const inputData = req.params;
  const file = req.files.file;
  const fileName = sanitize(file.name);
  const fileContent = fs.readFileSync(file.tempFilePath);
 try {
   const response = await MovieService.addMovieUserImages(inputData, fileContent, fileName);
   res.status(httpStatus.OK).json({
        success: true,
        message: "Object uploaded successfully",
        data: response,
      });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred uploading file. ${error}`,
    });
  }
}

export default {
  getAllMovies,
  getMovieByTitle,
  getGenreByName,
  getDirectorByName,
  getMovieUserImageList,
  getMovieUserImage,
  addMovieUserImages

};
