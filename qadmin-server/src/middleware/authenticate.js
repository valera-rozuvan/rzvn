const { validAuthCredentials } = require('../constants');

const matchAuthToken = (authToken) => {
  const match = validAuthCredentials.find((credentials) => credentials.authToken === authToken);

  return match;
};

function authenticate(req, res, next) {
  if (
    !req.headers
    || typeof req.headers.authorization !== 'string'
    || req.headers.authorization.length === 0
  ) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }

  const authToken = req.headers.authorization.replace('Bearer: ', '');
  if (!matchAuthToken(authToken)) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }

  next();
  return true;
}

module.exports = {
  authenticate,
};
