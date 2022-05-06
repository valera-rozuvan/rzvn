const { attributes } = require('structure');

const SuperAdminUpdateValidator = attributes({
  email: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 64,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
})(class SuperAdminUpdateValidator {});

module.exports = { SuperAdminUpdateValidator };
