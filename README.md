# myFlix API

## Description

A REST API for an application called “myFlix” that interacts with a database that stores data about different movies.

This is a he server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

The main purpose of this app is to present how I create a REST API architecture.

This site was built using [Heroku GitHub Deploys](https://devcenter.heroku.com/articles/github-integration).

[LIVE DEMO](https://myflixapi.smartcoder.dev/)

## Getting started

### Deployment

Install nodejs LTS or the latest version.

Clone the repository and run with npm:

```shell
git clone https://github.com/kal40/movie-api.git
cd movie-api
npm install
npm run
```

## Key Features

- Express library for endpoint routing
- Uses MongoDB noSQL database deployed on MongoDB Atlas
- Basic HTTP auth for first login then JWT (token-based) authentication for further API calls.
- User's password hashing

## Dependencies

See [`package.json`](https://raw.githubusercontent.com/kal40/movie-api/master/package.json)
