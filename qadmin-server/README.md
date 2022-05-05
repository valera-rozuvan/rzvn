# qadmin-server

Back-end API for QAdmin service. Allows for management of users, apps, and super admins.

## Setup

1. Make sure you have a MongoDB instance you can connect to, and have a valid DB connection string.

2. Install project NPM dependencies:

```shell
npm install
```

3. Create `.env` file, put there something like this:

```text
MONGO_URL=mongodb://superman:3m2n45b23nm4b23n55bn23m5b@localhost:27017/crypton
SERVICE_PORT=3001
SLEEP_TIMEOUT_SECONDS=1.1
ENABLE_TEST_USER=true
TEST_USER_EMAIL=test@test.test
TEST_USER_PASSWORD=zB0a6SIm2o1lnhtNMKpWlXYcdUbUNfWF
TEST_USER_AUTH_TOKEN=COmrTQTI2M6K2IzDUugyBhEBl2VMRSRD1CBmRC0DzbkTIrQjUtvNU9KUxRPqIfRq
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
