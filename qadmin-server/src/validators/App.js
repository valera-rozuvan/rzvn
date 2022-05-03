const { attributes } = require('structure');

const AppCreateValidator = attributes({
  serviceName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 256,
  },
  publicKey: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 256,
  },
  privateKey: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1024,
  },
  callbackUrl: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 1024,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
})(class AppCreateValidator {});

const AppUpdateValidator = attributes({
  serviceName: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 256,
  },
  publicKey: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 256,
  },
  privateKey: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 1024,
  },
  callbackUrl: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 1024,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
})(class AppUpdateValidator {});

module.exports = { AppCreateValidator, AppUpdateValidator };
