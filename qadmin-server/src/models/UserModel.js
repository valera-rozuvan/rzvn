const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    default: '',
  },
  lastName: {
    type: String,
    required: true,
    default: '',
  },
  isActive: {
    type: Boolean,
    required: true,
  },
}, { versionKey: false, timestamps: true });

const UserModel = new mongoose.model('User', schema);

module.exports = { UserModel };
