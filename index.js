const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const models = require("./models");
const movies = models.movie;
const users = models.user;

// ====================================
// === Const
// ====================================

const PORT = 3000;
const HOST = "0.0.0.0";

// ====================================
// === App
// ====================================

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

// ====================================
// === Middlewares
// ====================================

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ====================================
// === CREATE
// ====================================

app.post("/users", (req, res) => {
  users
    .findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + " already exists");
      } else {
        users
          .create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday,
          })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// ====================================
// === READ
// ====================================

app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    movies
      .find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    movies
      .findOne({ title: req.params.title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/movies/genres/:genreName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    movies
      .findOne({ "genre.name": req.params.genreName })
      .then((movie) => {
        res.json(movie.genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/movies/directors/:directorName",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    movies
      .findOne({ "director.name": req.params.directorName })
      .then((movie) => {
        res.json(movie.director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users
      .find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users
      .findOne({ username: req.params.username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// ====================================
// === UPDATE
// ====================================

app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday,
          },
        },
        { new: true }
      )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.post(
  "/users/:username/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $push: { favoriteMovies: req.params.movieId },
        },
        { new: true }
      )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// ====================================
// === DELETE
// ====================================

app.delete(
  "/users/:username/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users
      .findOneAndUpdate(
        { username: req.params.username },
        {
          $pull: { favoriteMovies: req.params.movieId },
        },
        { new: true }
      )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    users
      .findOneAndRemove({ username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(404).send(req.params.username + " was not found");
        } else {
          res.status(200).send(req.params.username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// ====================================
// === Static
// ====================================

app.get("/documentation", (req, res) => {
  res.status(200).sendFile("public/index.html", { root: __dirname });
});

// ====================================
// === Server
// ====================================

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
