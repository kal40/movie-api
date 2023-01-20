import Movie from "./movie.model.js";

const getAllMovies = async () => {
  const foundMovies = await Movie.find({});

  const finalResult = foundMovies;

  return finalResult;
};

const getMovieByTitle = async (inputData) => {
  const { title } = inputData;

  const foundMovie = await Movie.findOne({ title: title });

  const finalResult = foundMovie;

  return finalResult;
};

const getGenreByName = async (inputData) => {
  const { genreName } = inputData;

  const foundMovie = await Movie.findOne({
    "genre.name": genreName,
  });

  const finalResult = foundMovie.genre;

  return finalResult;
};

const getDirectorByName = async (inputData) => {
  const { directorName } = inputData;

  const foundMovie = await Movie.findOne({
    "director.name": directorName,
  });

  const finalResult = foundMovie.director;

  return finalResult;
};

export default {
  getAllMovies,
  getMovieByTitle,
  getGenreByName,
  getDirectorByName,
};
