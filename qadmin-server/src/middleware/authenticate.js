const jwt = require('jsonwebtoken');
const { attributes } = require('structure');
const { findAllSuperAdmins } = require('../utils');

const findSuperAdmin = async (email) => {
  const superAdmins = await findAllSuperAdmins();

  return superAdmins.find(
    (superAdmin) => superAdmin.email === email,
  );
};

const isAuthTokenValid = async (authToken) => {
  if (typeof authToken !== 'string' || authToken.length === 0) {
    return false;
  }

  let token;

  try {
    token = jwt.decode(authToken);
  } catch (err) {
    return false;
  }

  if (!token) {
    return false;
  }

  const TokenDataValidator = attributes({
    email: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 64,
    },
    type: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 32,
    },
  })(class TokenDataValidator {});

  const validationResults = TokenDataValidator.validate(token.data);
  if (!validationResults.valid) {
    return false;
  }

  const { email } = token.data;
  const superAdmin = await findSuperAdmin(email);

  if (!superAdmin) {
    return false;
  }

  try {
    jwt.verify(authToken, superAdmin.authSecret);
  } catch (err) {
    return false;
  }

  return true;
};

async function authenticate(req, res, next) {
  if (
    !req.headers
    || typeof req.headers.authorization !== 'string'
    || req.headers.authorization.length === 0
  ) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }

  const authToken = req.headers.authorization.replace('Bearer: ', '');
  const valid = await isAuthTokenValid(authToken);
  if (!valid) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }

  next();
  return true;
}

module.exports = {
  authenticate,
};
