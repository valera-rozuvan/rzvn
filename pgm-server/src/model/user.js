var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        // default: ''
    },

}, { versionKey: false, timestamps: true });

var user = new mongoose.model('User', schema);

module.exports = user;
