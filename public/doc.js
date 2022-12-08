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
 * @apiDefine DirectorNotFoundError
 *
 * @apiError (Error / Status Code: 404) DirectorNotFound The name of the <code>directorName</code> was not found.
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "DirectorNotFound"
 * }
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
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
        "title": "Black Panther: Wakanda Forever",
        "description": "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
        "genre": {
            "name": "Action",
            "description": "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
        },
        "director": {
            "name": "Ryan Coogler",
            "bio": "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
            "birth": "1986"
        },
        "imageURL": "https://artworks.thetvdb.com/banners/v4/movie/31110/backgrounds/636fafaf50adc.jpg"
    },
    {
        "title": "The Menu",
        "description": "A couple travels to a coastal island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.",
        "genre": {
            "name": "Horror",
            "description": "Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes. Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs."
        },
        "director": {
            "name": "Mark Mylod",
            "bio": "Mark Mylod is a British television and film director and executive producer. He is known for his work on the television series Succession and Shameless.",
            "birth": "1965"
        },
        "imageURL": "https://artworks.thetvdb.com/banners/v4/movie/337249/posters/632289ce2fc4d.jpg"
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
    "title": "Black Panther: Wakanda Forever",
    "description": "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
    "genre": {
        "name": "Action",
        "description": "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
    },
    "director": {
        "name": "Ryan Coogler",
        "bio": "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
        "birth": "1986"
    },
    "imageURL": "https://artworks.thetvdb.com/banners/v4/movie/31110/backgrounds/636fafaf50adc.jpg"
  }
 *
 * @apiUse MovieNotFoundError
 */

/**
 * @api {get} /movies/genres/:genreName Request genre information
 * @apiName GetMovieGenre
 * @apiGroup Movie
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
    "name": "Adventure",
    "description": "Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement. Some adventure fiction also satisfies the literary definition of romance fiction."
  }
 *
 * @apiUse GenreNotFoundError
 */

/**
 * @api {get} /movies/directors/:directorName Request director information
 * @apiName GetMoviedirector
 * @apiGroup Movie
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
    "name": "Ryan Coogler",
    "bio": "Ryan Kyle Coogler is an American film director, producer and screenwriter. He is a recipient of four NAACP Image Awards, four Black Reel Awards and an Academy Award nomination for Best Picture.",
    "birth": "1986"
  }
 *
 * @apiUse DirectorNotFoundError
 */

/**
 * @api {post} /users/ Create new user
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiBody {String} userName="johndoe"       Mandatory username
 * @apiBody {String} [name]           Optional name
 * @apiBody {String} [country="US"]      Optional with default value "US".
 * @apiBody {Number} [age=18]          Optional Age with default 18.
 * @apiBody (Login) {String} [pass]      User password.
 * @apiBody {Object} [address]         Optional nested address object.
 * @apiBody {String} [address[street]] Optional street and number.
 * @apiBody {String} [address[zip]]    Optional zip code.
 * @apiBody {String} [address[city]]   Optional city.
 *
 * @apiSuccess (Success / Status Code: 200) {String} userName Username of the User.
 *
 * @apiSuccessExample  {json} Success-Response:
HTTP/1.1 201 OK
 {
    "userName": "kal",
    "name": "",
    "favoriteMovies": [],
    "country": "US",
    "age": 18,
    "pass": "",
    "address[street]": "",
    "address[zip]": "",
    "address[city]": "",
    "id": "8b3bdaf7-b3e9-46da-a29f-98256f64e3f8"
  }
 *
 *
 */

/**
 * @api {put} /users/:id/:userName Update username
 * @apiName UpdateUserName
 * @apiGroup User
 *
 * @apiParam {Number} id          Users unique ID.
 * @apiParam {String} userName  Username of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
        "id": "1",
        "userName": "kal",
        "name": "Karoly Lonich",
        "favoriteMovies": []
    }
 *
 * @apiUse UserNotFoundError
 */

/**
 * @api {post} /users/:id/:movieTitle Add movie title to user's favorite movie list.
 * @apiName AddUserFavoriteMovie
 * @apiGroup User
 *
 * @apiParam {Number} id          Users unique ID.
 * @apiParam {String} movieTitle  The title of the movie to be added to the user's favorite list.
 *
 * @apiSuccessExample {String} Success-Response:
 *    HTTP/1.1 200 OK
 *      Casablanca was added to the user 1's array
 *
 * @apiUse UserNotFoundError
 */

/**
 * @api {delete} /users/:id/:movieTitle Delete movie title from user's favorite movie list.
 * @apiName DeleteUserFavoriteMovie
 * @apiGroup User
 *
 * @apiParam {Number} id          Users unique ID.
 * @apiParam {String} movieTitle  The title of the movie to be added to the user's favorite list.
 *
 * @apiSuccessExample {String} Success-Response:
 *     HTTP/1.1 200 OK
 *      Casablanca was deleted from the user 1's array
 * @apiUse UserNotFoundError
 */

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id          User unique ID.
 *
 * @apiSuccessExample {String} Success-Response:
 *    HTTP/1.1 200 OK
 *      Username: kal with ID: 1 was deleted from the users array

 * @apiUse UserNotFoundError
 */
