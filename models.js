const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/myflix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
});

let movie = mongoose.model("movie", moviSchema);
let user = mongoose.model("user", userSchema);

module.exports.movie = movie;
module.exports.user = user;
