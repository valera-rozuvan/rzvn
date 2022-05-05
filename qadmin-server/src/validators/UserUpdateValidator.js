const { attributes } = require('structure');

const UserUpdateValidator = attributes({
  email: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 64,
  },
  firstName: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 32,
  },
  lastName: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 32,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
})(class UserUpdateValidator {});

module.exports = { UserUpdateValidator };
