const dotenv = require('dotenv');
dotenv.config();

const envVariables = {
  MONGO_URL: '',
  SERVICE_PORT: '',
};

const allEnvPresent = Object.keys(envVariables).every((variableName) => {
  const value = process.env[variableName];

  if (typeof value !== 'string' || value.length === 0) {
    console.error(`Please provide '${variableName}' in .env file or as an environment variable.`);

    return false;
  }

  envVariables[variableName] = value;

  return true;
});

if (!allEnvPresent) {
 process.exit(1);
}

module.exports = envVariables;
