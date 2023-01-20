import mongoose from "mongoose";

let moviSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: String,
    description: String,
  },
  director: {
    name: String,
    bio: String,
  },
  actors: [String],
  imagePath: String,
  featured: Boolean,
});

let Movie = mongoose.model("movie", moviSchema);

export default Movie;
