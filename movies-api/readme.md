# Movies API

REST API for movie reviews with [Express 5.x (alpha)](https://expressjs.com/en/guide/migrating-5.html) and [Mongoose 5.x](https://mongoosejs.com/).

## Scripts

```sh
# Watch a dev server
npm run dev

# Seed MongoDB with fakes
npm run seed

# Run a prod server
npm start
```

## Endpoints

### Movies

Method | URI
------ | ---
GET | /movies
POST | /movies
GET | /movies/:movieId
PUT | /movies/:movieId
PATCH | /movies/:movieId
DELETE | /movies/:movieId

### Reviews

Method | URI
------ | ---
GET | /movies/:movieId/reviews
POST | /movies/:movieId/reviews
GET | /movies/:movieId/reviews/:reviewId
PUT | /movies/:movieId/reviews/:reviewId
PATCH | /movies/:movieId/reviews/:reviewId
DELETE | /movies/:movieId/reviews/:reviewId

## API

Status | Description
------ | -----------
200 | Success
201 | Resouce created
204 | No content
400 | Malformed request
422 | Failed validation
500 | Server error

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

- pagination
  - TODO: validate query, max limit/page + sorting via middleware
  - e.g. `get(paginate, sort(Movie.sortableFeilds), (req, res) => {}`
- filtering by fields
- csrf (e.g. csurf)
- security headers

## References

- [RFC7231 spec](https://tools.ietf.org/html/rfc7231#section-4.3)
