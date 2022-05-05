const { attributes } = require('structure');

const SuperAdminCreateValidator = attributes({
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64,
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 128,
  },
  authToken: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1024,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
})(class SuperAdminCreateValidator {});

module.exports = { SuperAdminCreateValidator };
