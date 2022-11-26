const { group } = require("console");
const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path");

//Const

const PORT = 3000;
const HOST = "0.0.0.0";

let movies = {
  movies: [
    {
      title: "Black Panther: Wakanda Forever",
    },
    {
      title: "The Menu",
    },
    {
      title: "The Wonder",
    },
    {
      title: "Stutz",
    },
    {
      title: "Disenchanted",
    },
    {
      title: "Spirited",
    },
    {
      title: "Black Adam",
    },
    {
      title: "The Fabelmans",
    },
    {
      title: "A Christmas Story Christmas",
    },
    {
      title: "Smile",
    },
  ],
};
//App

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("This is the movie api.");
});

app.get("/movies", (req, res) => {
  res.send(movies);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
