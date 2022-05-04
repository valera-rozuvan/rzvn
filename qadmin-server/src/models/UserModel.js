const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
}, { versionKey: false, timestamps: true });

const UserModel = new mongoose.model('User', schema);

module.exports = { UserModel };
