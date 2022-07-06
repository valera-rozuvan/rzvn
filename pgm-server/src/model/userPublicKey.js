var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userPublicKey: {
        type: String,
        required: true,
        unique:true,
        // default: ''
    },
    userId: {
        type: String,
        required: true,
        // default: ''
    },
    userName:{
        type: String,
        required: true,
        // default: ''   
    }

}, { versionKey: false, timestamps: true, collection: 'UserPublicKey'});

var userPublicKey = new mongoose.model('UserPublicKey', schema);

module.exports = userPublicKey ;
