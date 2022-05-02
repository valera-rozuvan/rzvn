const envVariables = require('../../src/utils/envVariables');

const axios = require('axios');

function authHeaders(appPrivateKey) {
  return {Authorization: `Bearer: ${appPrivateKey}`};
}

function getAuthToken(req) {
  if (
    !req ||
    !req.headers ||
    typeof req.headers.authorization !== 'string' ||
    req.headers.authorization.length === 0
  ) {
    return null;
  }

  const authToken = req.headers.authorization.replace("Bearer: ", "");
  if (typeof authToken !== 'string' || authToken.length === 0) {
    return null;
  }

  return authToken;
}

async function isAuthTokenValid(authToken) {
  try {
    const response = await axios.post(
      `${envVariables.AUTH_API_URL}/user_auth/check`,
      {authToken},
      {headers: authHeaders(envVariables.APP_PRIVATE_KEY)}
    );

    if (
      !response ||
      !response.data ||
      response.data.status !== 'OK'
    ) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

async function isAuthenticated(req) {
  const authToken = getAuthToken(req);
  if (!authToken) {
    return false;
  }

  const authTokenValid = await isAuthTokenValid(authToken);
  if (!authTokenValid) {
    return false;
  }

  return true;
}

// Exchange an "authorization code" for an "access token".
const issueToken = async (req, res) => {
  if (
    !req ||
    !req.body ||
    typeof req.body.authorizationCode !== 'string' ||
    req.body.authorizationCode.length === 0
  ) {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const response = await axios.post(
      `${envVariables.AUTH_API_URL}/user_auth/token`,
      {authorizationCode: req.body.authorizationCode},
      {headers: authHeaders(envVariables.APP_PRIVATE_KEY)}
    );

    if (
      !response ||
      !response.data ||
      typeof response.data.authToken !== 'string' ||
      response.data.authToken.length === 0
    ) {
      return res.status(401).json({message: "Unauthorized"});
    }

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(401).json({message: "Unauthorized"});
  }
}

// Exchange an old "auth token" for a new "auth token".
const updateToken = async (req, res) => {
  const authToken = getAuthToken(req, res);
  if (!authToken) {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const response = await axios.put(
      `${envVariables.AUTH_API_URL}/user_auth/token`,
      {authToken},
      {headers: authHeaders(envVariables.APP_PRIVATE_KEY)}
    );

    if (
      !response ||
      !response.data ||
      typeof response.data.authToken !== 'string' ||
      response.data.authToken.length === 0
    ) {
      return res.status(401).json({message: "Unauthorized"});
    }

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(401).json({message: "Unauthorized"});
  }
}

// Request for an "auth token" to be deleted. Basically - this is a logout operation.
const deleteToken = async (req, res) => {
  const authToken = getAuthToken(req, res);
  if (!authToken) {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const response = await axios.post(
      `${envVariables.AUTH_API_URL}/user_auth/logout`,
      {authToken},
      {headers: authHeaders(envVariables.APP_PRIVATE_KEY)}
    );

    if (
      !response ||
      !response.data ||
      response.data.status !== 'OK'
    ) {
      return res.status(401).json({message: "Unauthorized"});
    }

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(401).json({message: "Unauthorized"});
  }
}

// Request for user details associated with an "auth token".
const userDetails = async (req, res) => {
  const authToken = getAuthToken(req, res);
  if (!authToken) {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const response = await axios.post(
      `${envVariables.AUTH_API_URL}/user_auth/details`,
      {authToken},
      {headers: authHeaders(envVariables.APP_PRIVATE_KEY)}
    );

    if (
      !response ||
      !response.data ||
      typeof response.data.email !== 'string' ||
      response.data.email.length === 0
    ) {
      return res.status(401).json({message: "Unauthorized"});
    }

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(401).json({message: "Unauthorized"});
  }
}

// Request to check if an "auth token" is valid.
const checkToken = async (req, res) => {
  const authenticated = await isAuthenticated(req);
  if (!authenticated) {
    return res.status(401).json({message: "Unauthorized"});
  }

  return res.status(200).json({status: 'OK'});
}

module.exports = {
  // private methods
  isAuthenticated,

  // public methods
  issueToken,
  updateToken,
  deleteToken,
  userDetails,
  checkToken,
};
