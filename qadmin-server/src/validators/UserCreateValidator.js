const { attributes } = require('structure');

const UserCreateValidator = attributes({
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 32,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 32,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
})(class UserCreateValidator {});

module.exports = { UserCreateValidator };
