# qa-server

## Setup

1. Make sure you have MongoDB running, and have a valid connection string.

2. Install project NPM dependencies:

```shell
npm install
```

3. Create `.env` file, put there something like this:

```text
MONGO_URL="mongodb://user:password@localhost:27017/database"
SERVICE_PORT="4000"
```

## Running

To run:

```shell
node ./server.js
```

Or if you have []() installed, you can run:

```shell
nodemon ./server.js
```
