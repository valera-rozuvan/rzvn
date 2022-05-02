var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	serviceName: {
		type: String,
		unique: true
	},
	publicKey: {
		type: String,
		required: true,
	},
	privateKey: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
	},
	callbackUrl: {
		type: String,
	},
}, { versionKey: false, timestamps: true });

var app = new mongoose.model('App', schema);

module.exports = app;

