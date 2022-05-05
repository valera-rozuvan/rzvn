const { envVariables } = require('../utils');

const validAuthCredentials = [
  {
    email: 'valera@rozuvan.net',
    password: 'distant touch code expose quiet',
    authToken: 'Wv9DKR4FpWX3r1Qi0MoakHMTAqBCXzhJLH0KVe7Iq3EHS2sSB6tQ1qeFT4PGnuyJXc2zqfPOigI3rzrF3SeUDRG9zbOIHWPOEC89UvnvM9BQTULV2mbXzP1b3yX0lwyK',
  },
  {
    email: 'dariaausten@gmail.com',
    password: 'pump climate thesis lemon bake',
    authToken: 'RybxH1swHUxW9i0vAbZ37H4owKWMAJDyPin36gffTi0OYCWiaVYEUJJXxx1A8nAAHhD8E2QqvZaHYQToHfXspDeF8q6bpHX0bIrz6uWBdsVyRbLSl7VF0B7vlJ3uWgT8',
  },
];

if (envVariables.ENABLE_TEST_USER === 'true') {
  validAuthCredentials.push({
    email: envVariables.TEST_USER_EMAIL,
    password: envVariables.TEST_USER_PASSWORD,
    authToken: envVariables.TEST_USER_AUTH_TOKEN,
  });
}

module.exports = { validAuthCredentials };
