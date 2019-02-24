# Movies API

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

## Docker

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

## TODO

- pagination
- filtering
- csrf (e.g. csurf)
- security headers
