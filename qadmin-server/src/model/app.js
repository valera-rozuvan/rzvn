const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  serviceName: {
    type: String,
    unique: true,
  },
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  callbackUrl: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true });

const app = new mongoose.model('App', schema);

module.exports = app;
