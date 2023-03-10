const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { envVariables } = require('./src/utils');

const {
  AppRouter,
  AuthRouter,
  SuperAdminRouter,
  UserRouter,
} = require('./src/routers');

function initService() {
  console.log('Trying to initialize Express.js server...');

  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const sleepTimeoutSeconds = Number.parseFloat(envVariables.SLEEP_TIMEOUT_SECONDS);
  if (Number.isNaN(sleepTimeoutSeconds)) {
    console.error('"SLEEP_TIMEOUT_SECONDS" should be set to a numeric value.');
    process.exit(1);
  }
  if (sleepTimeoutSeconds < 0 || sleepTimeoutSeconds > 60) {
    console.error('"SLEEP_TIMEOUT_SECONDS" should be a number in the range 0-60 (inclusive).');
    process.exit(1);
  }

  function artificialSleep(req, res, next) {
    setTimeout(() => {
      next();
    }, sleepTimeoutSeconds * 1000);
  }

  app.use(artificialSleep);

  app.use('/app', AppRouter);
  app.use('/auth', AuthRouter);
  app.use('/superadmin', SuperAdminRouter);
  app.use('/user', UserRouter);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
  });

  const servicePort = Number.parseInt(envVariables.SERVICE_PORT, 10);
  if (Number.isNaN(servicePort)) {
    console.error('"SERVICE_PORT" should be set to a numeric value.');
    process.exit(1);
  }
  if (servicePort < 1000 || servicePort > 65535) {
    console.error('"SERVICE_PORT" should be a number in the range 1000-65535 (inclusive).');
    process.exit(1);
  }

  app.listen(servicePort, () => {
    console.log(`Server is listening on port '${servicePort}'.`);
  });
}

function initMongo() {
  console.log('Trying to connect to MongoDB...');

  mongoose.connect(envVariables.MONGO_URL, null, (err) => {
    if (err) {
      console.error('Could not connect to the database', err);
      process.exit(1);

      return;
    }

    console.log('Connected to MongoDB database successfully.');

    initService();
  });
}

initMongo();
