const { SuperAdminModel } = require('../models');
const { envVariables } = require('./envVariables');

const findAllSuperAdmins = async () => {
  const data = await SuperAdminModel.find();

  let superAdmins = [];

  if (
    data
    && Array.isArray(data)
    && data.length > 0
  ) {
    superAdmins = data.map((superAdminData) => ({
      email: superAdminData.email,
      password: superAdminData.password,
      authSecret: superAdminData.authSecret,
    }));
  }

  if (envVariables.ENABLE_TEST_USER === 'true') {
    superAdmins.push({
      email: envVariables.TEST_USER_EMAIL,
      password: envVariables.TEST_USER_PASSWORD,
      authSecret: envVariables.TEST_USER_AUTH_SECRET,
    });
  }

  return superAdmins;
};

module.exports = { findAllSuperAdmins };
