const envVariables = require('./src/utils/envVariables');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const ResourceRoute = require('./src/routes/resource');
const AuthRoute = require('./src/routes/auth');

function initMongo() {
  console.log('Trying to connect to MongoDB...');

  mongoose.connect(envVariables.MONGO_URL, null, (err) => {
    if (err) {
      console.error('Could not connect to the database', err);
      process.exit(1);

      return;
    }

    console.log("Connected to MongoDB database successfully.");

    initService();
  });
}

function initService() {
  console.log('Trying to initialize Express.js server...');

  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  const artificialSleep = function (req, res, next) {
    const SLEEP_TIMEOUT_SECONDS = 1.5;

    setTimeout(() => {
      next();
    }, SLEEP_TIMEOUT_SECONDS * 1000);
  };

  app.use(artificialSleep);

  app.use('/resource', ResourceRoute);
  app.use('/auth', AuthRoute);

  app.get('/', (req, res) => {
    res.json({"message": "Hello, world!"});
  });

  const servicePort = Number.parseInt(envVariables.SERVICE_PORT, 10);
  if (Number.isNaN(servicePort)) {
    console.error('"SERVICE_PORT" should be set to a numeric value.');
    return process.exit(1);
  }
  if (servicePort < 1000 || servicePort > 65535) {
    console.error('"SERVICE_PORT" should be a number in the range 1000-65535 (inclusive).');
    return process.exit(1);
  }

  app.listen(servicePort, () => {
    console.log(`Server is listening on port '${servicePort}'.`);
  });
}

initMongo();
