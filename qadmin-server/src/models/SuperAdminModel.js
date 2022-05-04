const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  authToken: {
    type: String,
    required: true,
    default: '',
  },
  isActive: {
    type: Boolean,
    required: true,
  },
}, { versionKey: false, timestamps: true });

const SuperAdminModel = new mongoose.model('SuperAdmin', schema);

module.exports = { SuperAdminModel };
