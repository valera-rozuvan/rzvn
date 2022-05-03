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

function matchEmailAndPassword(email, password) {
  const match = validAuthCredentials.find((credentials) => credentials.email === email && credentials.password === password);

  return match;
}

const matchAuthToken = (authToken) => validAuthCredentials.find((credentials) => credentials.authToken === authToken);

function authenticate(req, res, next) {
  if (!req.headers || typeof req.headers.authorization !== 'string' || req.headers.authorization.length === 0) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }
  console.log(`req.headers.authorization = '${req.headers.authorization}'`);
  const authToken = req.headers.authorization.replace('Bearer: ', '');
  if (!matchAuthToken(authToken)) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }
  next();
}

async function getToken(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "'req.body' must be defined" });
  }

  if (typeof req.body.email !== 'string') {
    return res.status(400).json({ message: "'req.body.email' must be a string" });
  }
  const { email } = req.body;

  if (typeof req.body.password !== 'string') {
    return res.status(400).json({ message: "'req.body.password' must be a string" });
  }
  const { password } = req.body;

  const match = matchEmailAndPassword(email, password);
  if (!match) {
    return res.status(400).json({
      message: 'Bad auth credentials.',
    });
  }

  return res.status(200).json(match);
}

module.exports = {
  getToken,
  authenticate,
};
