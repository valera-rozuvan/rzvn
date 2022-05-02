const AppModel = require('../model/app')


// Create and Save a new app
exports.create = async (req, res) => {

	if (!req.body.serviceName && !req.body.publicKey && !req.body.privateKey) {
		return res.status(400).json({ message: "Content can not be empty!" });
	}
	const app = new AppModel({
		serviceName: req.body.serviceName,
		publicKey: req.body.publicKey,
		privateKey: req.body.privateKey,
		isActive: req.body.isActive,
		callbackUrl: req.body.callbackUrl,
	});

	await app.save().then(data => {
		res.json({
			serviceName: data.serviceName,
			publicKey: data.publicKey,
			privateKey: data.privateKey,
			isActive: data.isActive,
			callbackUrl: data.callbackUrl,
			createdAt: data.createdAt,
			id: data._id.toString()
		});
	}).catch(err => {
		res.status(500).json({
			message: err.message || "Some error occurred while creating app"
		});
	});
};

// Retrieve all apps from the database.
exports.findAll = async (req, res) => {
	try {
		const apps = await AppModel.find();
		const newApps = apps.map(app => {
			return {
				serviceName: app.serviceName,
				publicKey: app.publicKey,
				privateKey: app.privateKey,
				isActive: app.isActive,
				callbackUrl: app.callbackUrl,
				createdAt: app.createdAt,
				id: app._id.toString()
			}
		})
		res.status(200).json(newApps);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Find a single App with a id
exports.findOne = async (req, res) => {
	const id = req.params.id;
	try {
		const app = await AppModel.findById(id);
		const newApp = {
			serviceName: app.serviceName,
			publicKey: app.publicKey,
			privateKey: app.privateKey,
			isActive: app.isActive,
			callbackUrl: app.callbackUrl,
			createdAt: app.createdAt,
			id: app._id.toString()
		}
		res.status(200).json(newApp);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Update an app by the id in the request
exports.update = async (req, res) => {

	if (!req.body) {
		res.status(400).json({
			message: "Data to update can not be empty!"
		});
	}
	const id = req.params.id;
	await AppModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true }).then(data => {
		if (!data) {
			res.status(404).json({
				message: `App not found.`
			});
		} else {
			res.json({
				serviceName: data.serviceName,
				publicKey: data.publicKey,
				privateKey: data.privateKey,
				isActive: data.isActive,
				callbackUrl: data.callbackUrl,
				createdAt: data.createdAt,
				id: data._id.toString()
			})
		}
	}).catch(err => {
		res.status(500).json({
			message: err.message
		});
	});
};

// Delete an app with the specified id in the request
exports.destroy = async (req, res) => {

	const id = req.params.id;
	await AppModel.findByIdAndRemove(id).then(data => {
		if (!data) {
			res.status(404).json({
				message: `App not found.`
			});
		} else {
			res.json({ status: 'ok' });
		}
	}).catch(err => {
		res.status(500).json({
			message: err.message
		});
	});
};
