const { attributes } = require('structure');

const SuperAdminCreateValidator = attributes({
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
})(class SuperAdminCreateValidator {});

module.exports = { SuperAdminCreateValidator };
