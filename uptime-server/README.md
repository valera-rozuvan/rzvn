# uptime-server

Back-end API for Uptime service. Allows for management of resources to be queried on a periodic basis from various geographical locations.

## Setup

1. Make sure you have a MongoDB instance you can connect to, and have a valid DB connection string.

2. Install project NPM dependencies:

```shell
npm install
```

3. Create `.env` file, put there something like this:

```text
MONGO_URL=mongodb://sharky:3m2n45b23nm4b23n55bn23m5b@localhost:27017/sharky
SERVICE_PORT=4001
AUTH_API_URL=http://localhost:5000
APP_PRIVATE_KEY=7y8r32ur8ry337y3298yu382ry38
```

## Running

To run the server, you can do:

```shell
node ./server.js
```

Or, if you have [nodemon](https://www.npmjs.com/package/nodemon) installed, you can do:

```shell
nodemon ./server.js
```
