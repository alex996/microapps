# Movies API

REST API for movie reviews with [Express 5.x (alpha)](https://expressjs.com/en/guide/migrating-5.html) and [Mongoose 5.x](https://mongoosejs.com/).

## Scripts

```sh
# Watch a dev server
npm run dev

# Seed MongoDB with fakes
npm run seed

# Build a prod bundle
npm run build

# Run a prod server
npm start
```

## Endpoints

### Movies

Method | URI
:----- | :--
GET | /movies
POST | /movies
GET | /movies/:movieId
PUT | /movies/:movieId
PATCH | /movies/:movieId
DELETE | /movies/:movieId

### Reviews

Method | URI
:----- | :--
GET | /movies/:movieId/reviews
POST | /movies/:movieId/reviews
GET | /movies/:movieId/reviews/:reviewId
PUT | /movies/:movieId/reviews/:reviewId
PATCH | /movies/:movieId/reviews/:reviewId
DELETE | /movies/:movieId/reviews/:reviewId

## Models

### Movie

Field     | Type     | Validation
:-------- | :------- | :---------
_id       | ObjectId |
title     | String   | 1-255, trim, required
genre     | [String] | enum, 0-10
minutes   | Number   | 1-500
year      | Number   | 1900-2999, required
createdAt | Date     |
updatedAt | Date     |

### Review

Field        | Type     | Validation
:----------- | :------- | :---------
_id          | ObjectId |
movieId      | ObjectId | required
comment      | String   | 1-4000, required
author.name  | String   | 1-255, required
author.email | String   | 1-254, regex, required
rating       | Number   | 1-10, required
createdAt    | Date     |
updatedAt    | Date     |

## Status Codes

Status | Description
:----- | :----------
200 | Success
201 | Resouce created
204 | No content
400 | Malformed request
422 | Failed validation
500 | Server error

## Requests

> For a trailing newline, use `-w "\n"`. To have it for *all* requests, run `echo '-w "\n"' >> ~/.curlrc`.

### Movies

```sh
curl localhost:3000/movies

curl 'localhost:3000/movies?limit=5&page=2'

curl -X POST -H 'Content-Type: application/json' -d '{"title":"Taxi","year":1998}' localhost:3000/movies

curl localhost:3000/movies/5c96d09f5d1ff23138f46ed6

curl -X PUT -H 'Content-Type: application/json' -d '{"title":"Taxi 2","year":2003}' \
localhost:3000/movies/5c96d09f5d1ff23138f46ed6

curl -X PATCH -H 'Content-Type: application/json' -d '{"year":2000}' \
localhost:3000/movies/5c96d09f5d1ff23138f46ed6

curl -X DELETE localhost:3000/movies/5c96d09f5d1ff23138f46ed6
```

### Reviews

```sh
curl localhost:3000/movies/5c96d09f5d1ff23138f46ed6/reviews

curl 'localhost:3000/movies/5c96d09f5d1ff23138f46ed6/reviews?limit=10&page=3'

curl -X POST -H 'Content-Type: application/json' \
-d '{"comment":"Love this movie!","author":{"name":"Ray","email":"ray@gmail.com"},"rating":9}' \
localhost:3000/movies/5c96d09f5d1ff23138f46ed6/reviews

curl localhost:3000/movies/5c96d09f5d1ff23138f46ed6/reviews/5c96d5626390eb383204662b

curl -X PUT -H 'Content-Type: application/json' \
-d '{"comment":"Best movie ever!","author":{"name":"Ray","email":"ray@gmail.com"},"rating":9.5}' \
localhost:3000/movies/5c96d09f5d1ff23138f46ed6/reviews/5c96d5626390eb383204662b

curl -X PATCH -H 'Content-Type: application/json' -d '{"rating":10}' \
localhost:3000/movies/5c96d09f5d1ff23138f46ed6/reviews/5c96d5626390eb383204662b

curl -X DELETE localhost:3000/movies/5c96d09f5d1ff23138f46ed6/reviews/5c96d5626390eb383204662b
```

## Docker

The easier way to get a MongoDB instance is to fire up a Docker container.

<details><summary>Instructions</summary>
<p>

```sh
# Start a MongoDB container in the background on port 27017 and create a 'root' user on the 'admin' database
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo

# Run the mongo CLI client on the container as 'root' against 'admin' database and connect to 'cinema'
docker exec -it mongodb mongo -u root -p secret --authenticationDatabase admin cinema

# Inside the client, create an admin user for the 'chat' database
db.createUser({
  user: 'admin', pwd: 'secret', roles: ['readWrite', 'dbAdmin']
})

# Verify that you can connect to mongo through the exposed port on your host machine
curl 127.0.0.1:27017 # It looks like you are trying to access MongoDB over HTTP on the native driver port.
```

</p>
</details>

## TODO

- filtering by fields
- csrf (e.g. csurf)
- security headers

## References

- [RFC7231 spec](https://tools.ietf.org/html/rfc7231#section-4.3)
