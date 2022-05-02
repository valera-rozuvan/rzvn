const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  url: {
    type: String,
  },
  method: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
}, {versionKey: false, timestamps: true});

const resource = new mongoose.model('Resource', schema);

module.exports = resource;
