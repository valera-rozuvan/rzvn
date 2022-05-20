var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  recieverPublicKey: {
    type: String,
    // required: true,
  },
  senderPublicKey: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  text: {
    type: String,
    required: true,
  },

}, { versionKey: false, timestamps: true });

var message = new mongoose.model('Message', schema);

module.exports = message;