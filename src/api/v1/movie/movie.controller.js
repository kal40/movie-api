import httpStatus from "http-status";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import fileUpload from "express-fileupload";

import MovieService from "./movie.service.js";
import config from "../../../config/config.js";

const s3Client = new S3Client({
  region: "eu-central-1",
  endpoint: "http://localhost:4566",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "john",
    secretAccessKey: "doe",
  },
});


const streamToString = (stream) => new Promise((resolve, reject) => {
  const chunks = [];
  stream.on('data', (chunk) => chunks.push(chunk));
  stream.on('error', reject);
  stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
});

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

  const command = new ListObjectsV2Command({
    Bucket: config.imagesBucket,
  });

  try {
    const response = await s3Client.send(command)
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
  const inputData = req.params;
  const command = new GetObjectCommand({
    "Bucket": config.imagesBucket,
    "Key": inputData.filename,
  });

  try {
    const response = await s3Client.send(command)
    const stream = response.Body;
    fs.writeFileSync(`/tmp/${inputData.filename}`, Buffer.concat(await stream.toArray()));
     res.status(httpStatus.OK).sendFile(`/tmp/${inputData.filename}`);
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `Error occurred fetching file. ${error}`,
    });
  }
};

const addMovieUserImages = async (req, res) => {
  const inputData = req.params;
  const file = req.files.file;
  const fileName = file.name;
  const fileContent = fs.readFileSync(file.tempFilePath);

  const command = new PutObjectCommand({
    "Bucket": config.imagesBucket,
    "Key": fileName,
    "Body": fileContent,
  })

 try {
   const response = await s3Client.send(command);
   console.log(response);
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
