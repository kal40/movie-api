import Movie from "./movie.model.js";

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

export default {
  getAllMovies,
  getMovieByTitle,
  getGenreByName,
  getDirectorByName,
};
