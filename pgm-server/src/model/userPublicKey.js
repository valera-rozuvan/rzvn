var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userPublicKey: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        default: ''
    },
    userName:{
        type: String,
        default: ''   
    }

}, { versionKey: false, timestamps: true });

var userPublicKey = new mongoose.model('UserPublicKey', schema);

module.exports = userPublicKey ;
