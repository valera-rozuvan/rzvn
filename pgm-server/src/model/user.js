var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        // default: ''
    },
    password: {
        type: String,
        required: true,
        // default: ''
    },

}, { versionKey: false, timestamps: true });

var user = new mongoose.model('User', schema);

module.exports = user;
