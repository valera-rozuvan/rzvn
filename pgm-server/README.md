# qadmin-server

Back-end API for QAdmin service. Allows for management of friends.

## Setup

1. Make sure you have a MongoDB instance you can connect to, and have a valid DB connection string.

2. Install project NPM dependencies:

```shell
npm install
```

3. Create `.env` file, put there something like this:

```text
MONGO_URL=mongodb://sharky:3m2n45b23nm4b23n55bn23m5b@localhost:27017/sharky
SERVICE_PORT=3001
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
