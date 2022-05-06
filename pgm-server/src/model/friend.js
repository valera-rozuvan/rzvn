var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
}, {versionKey: false, timestamps: true});

var friend = new mongoose.model('Friend', schema);

module.exports = friend;
