# Movies API

## Setup

TODO: Docker

## Endpoints

### Movies

- GET /movies
- POST /movies
- GET /movies/:movieId
- PUT/PATCH /movies/:movieId
- DELETE /movies/:movieId

### Reviews

- GET /movies/:movieId/reviews
- POST /movies/:movieId/reviews
- GET /movies/:movieId/reviews/:id
- PUT/PATCH /movies/:movieId/reviews/:id
- DELETE /movies/:movieId/reviews/:id

## TODO

- pagination
- filtering
- validation (e.g. celebrate or mongoose)
- csrf (e.g. csurf)
- security headers
