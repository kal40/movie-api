/**
 * @apiDefine MovieNotFoundError
 *
 * @apiError (Error / Status Code: 404) MovieNotFound The <code>title</code> of the Movie was not found.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "MovieNotFound"
 * }
 */

/**
 * @apiDefine GenreNotFoundError
 *
 * @apiError (Error / Status Code: 404) GenreNotFound The name of the <code>genreName</code> was not found.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "GenreNotFound"
 * }
 */

/**
 * @api {get} /movies Request the list of all movies
 * @apiName GetMovies
 * @apiGroup Movie
 *
 * @apiSuccess (Success / Status Code: 200) {Object[]} movies The list of movies.
 * @apiSuccess (Success / Status Code: 200) {String} movies.description The description of the Movie.
 * @apiSuccess (Success / Status Code: 200) {String} movies.genre The genre of the Movie.
 * @apiSuccess (Success / Status Code: 200) {String} movies.director The director of the Movie.
 * @apiSuccess (Success / Status Code: 200) {String} movies.imageURL The image URL of the Movie.
 * @apiSuccess (Success / Status Code: 200) {Boolean} movies.featured Whether the movie is featured or not.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *[
    {
      title: "Black Panther: Wakanda Forever",
      description:
        "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
      genre: {
        name: "Action",
        description: "",
      },
      director: {
        name: "Ryan Coogler",
        bio: "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
        birth: "1986",
      },
      imageURL:
        "https://artworks.thetvdb.com/banners/v4/movie/31110/backgrounds/636fafaf50adc.jpg",
    },
    {
      title: "The Menu",
      description:
        "A couple travels to a coastal island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.",
      genre: {
        name: "Horror",
        description: "",
      },
      director: {
        name: "Mark Mylod",
        bio: "Mark Mylod is a British television and film director and executive producer. He is known for his work on the television series Succession and Shameless.",
        birth: "1965",
      },
      imageURL:
        "https://artworks.thetvdb.com/banners/v4/movie/337249/posters/632289ce2fc4d.jpg",
    }
  ];
 */

/**
 * @api {get} /movies/:title Request movie information
 * @apiName GetMovie
 * @apiGroup Movie
 *
 * @apiParam {String} title Movie unique title
 *
 * @apiSuccess (Success / Status Code: 200) {Object} movie Movie information.
 * @apiSuccess (Success / Status Code: 200) {String} movie.description The description of the Movie.
 * @apiSuccess (Success / Status Code: 200) {String} movie.genre The genre of the Movie.
 * @apiSuccess (Success / Status Code: 200) {String} movie.director The director of the Movie.
 * @apiSuccess (Success / Status Code: 200) {String} movie.imageURL The image URL of the Movie.
 * @apiSuccess (Success / Status Code: 200) {Boolean} movie.featured Whether the movie is featured or not.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
      title: "Black Panther: Wakanda Forever",
      description:
        "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
      genre: {
        name: "Action",
        description: "",
      },
      director: {
        name: "Ryan Coogler",
        bio: "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
        birth: "1986",
      },
      imageURL:
        "https://artworks.thetvdb.com/banners/v4/movie/31110/backgrounds/636fafaf50adc.jpg",
   }
 *
 * @apiUse MovieNotFoundError
 */

/**
 * @api {get} /movies/genres/:genreName Request genre information
 * @apiName GetMovieGenre
 * @apiGroup Genre
 *
 * @apiParam {String} genreName Genre unique name.
 *
 * @apiSuccess (Success / Status Code: 200) {Object} genre Genre information.
 * @apiSuccess (Success / Status Code: 200) {String} genre.name The name of the genre.
 * @apiSuccess (Success / Status Code: 200) {String} genre.description The description of the genre.
 *
 * @apiSuccessExample {json} Success-Response:
 *HTTP/1.1 200 OK
 *{
 *   name: "Action",
 *   description:
 *     "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.*",
 *}
 *
 * @apiUse GenreNotFoundError
 */

/**
 * @api {get} /movies/directors/:directorName Request director information
 * @apiName GetMoviedirector
 * @apiGroup Director
 *
 * @apiParam {String} directorName Director unique name.
 *
 * @apiSuccess (Success / Status Code: 200) {Object} director Director information.
 * @apiSuccess (Success / Status Code: 200) {String} director.name The name of the director.
 * @apiSuccess (Success / Status Code: 200) {String} director.bio The bio of the director.
 * @apiSuccess (Success / Status Code: 200) {Number} director.birth The birth year of the director.
 *
 * @apiSuccessExample {json} Success-Response:
 *HTTP/1.1 200 OK
 *{
      name: "Ryan Coogler",
      bio: "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
      birth: "1986",
  }
 *
 * @apiUse DirectorNotFoundError
 */
