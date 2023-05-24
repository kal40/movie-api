import Movie from "./movie.model.js";

import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import config from "../../../config/config.js";


const s3Client = new S3Client({
  region: "eu-central-1",
  // endpoint: "http://localhost:4566",
  // forcePathStyle: true,
  // credentials: {
  //   accessKeyId: "john",
  //   secretAccessKey: "doe",
  // },
});

const getAllMovies = async () => {
  const foundMovies = await Movie.find({});

  const finalResult = foundMovies;

  return finalResult;
};

const getMovieByTitle = async ({ title }) => {
  const foundMovie = await Movie.findOne({ title: title });

  const finalResult = foundMovie;

  return finalResult;
};

const getGenreByName = async ({ genreName }) => {
  const foundMovie = await Movie.findOne({
    "genre.name": genreName,
  });

  const finalResult = foundMovie;

  return finalResult;
};

const getDirectorByName = async ({ directorName }) => {
  const foundMovie = await Movie.findOne({
    "director.name": directorName,
  });

  const finalResult = foundMovie;

  return finalResult;
};

const getMovieUserImageList = async ({ movieId, userId}) => {
  const command = new ListObjectsV2Command({
    Bucket: config.imagesBucket,
    Prefix: `users/${userId}/${movieId}/`,
  });

  const response = await s3Client.send(command)

  return response;
}

const getMovieUserImage = async (objectKey) => {
  const command = new GetObjectCommand({
    "Bucket": config.imagesBucket,
    "Key": objectKey,
  });

  const response = await s3Client.send(command)

  return response;
}

const addMovieUserImages = async ({ movieId, userId }, fileContent, fileName) => {
  console.log(movieId, userId, fileName);

  const command = new PutObjectCommand({
    "Bucket": config.imagesBucket,
    "Key": `users/${userId}/${movieId}/original-images/${fileName}`,
    "Body": fileContent,
  })

  const response = await s3Client.send(command);

  return response;
}

export default {
  getAllMovies,
  getMovieByTitle,
  getGenreByName,
  getDirectorByName,
  getMovieUserImageList,
  getMovieUserImage,
  addMovieUserImages,
};
