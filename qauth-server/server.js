const dotenv = require('dotenv');
dotenv.config();

if (typeof process.env.SERVICE_PORT !== 'string' || process.env.SERVICE_PORT.length === 0) {
  console.error('Please provide "SERVICE_PORT" in .env file!');
  process.exit(1);

  return;
}
const servicePort = Number.parseInt(process.env.SERVICE_PORT, 10);
if (Number.isNaN(servicePort)) {
  console.error('"SERVICE_PORT" should be set to a numeric value!');
  process.exit(1);

  return;
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthRoute = require('./src/routes/auth');

function initService() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/auth', AuthRoute);

  app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
  });

  app.listen(servicePort, () => {
    console.log(`Server is listening on port ${servicePort}`);
  });
}

initService();
