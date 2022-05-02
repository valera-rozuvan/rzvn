const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: ''
  },
  authToken: {
    type: String,
    default: ''
  },
}, {versionKey: false, timestamps: true});

const superAdmins = new mongoose.model('SuperAdmin', schema);

module.exports = superAdmins;
