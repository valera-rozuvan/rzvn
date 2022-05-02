const UserModel = require('../model/user')

// Create and Save a new user
exports.create = async (req, res) => {
	if (!req.body.email && !req.body.firstName && !req.body.lastName) {
		return res.status(400).json({ message: "Content can not be empty!" });
	}
	const user = new UserModel({
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});

	await user.save().then(data => {
		res.json({
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			createdAt: data.createdAt,
			id: data._id.toString()
		});
	}).catch(err => {
		res.status(500).json({
			message: err.message || "Some error occurred while creating user"
		});
	});
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
	try {
		const users = await UserModel.find();
		const newUsers = users.map(user => {
			return {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				createdAt: user.createdAt,
				id: user._id.toString()
			}
		})
		res.status(200).json(newUsers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Find a single User with an id
exports.findOne = async (req, res) => {
	const id = req.params.id;
	try {
		const user = await UserModel.findById(id);
		const newUser = {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			createdAt: user.createdAt,
			id: user._id.toString()
		}
		res.status(200).json(newUser);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Update a user by the id in the request
exports.update = async (req, res) => {

	if (!req.body) {
		res.status(400).json({
			message: "Data to update can not be empty!"
		});
	}
	const id = req.params.id;
	await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true }).then(data => {
		if (!data) {
			res.status(404).json({
				message: `User not found.`
			});
		} else {
			res.json({
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				createdAt: data.createdAt,
				id: data.id.toString()
			})
		}
	}).catch(err => {
		res.status(500).json({
			message: err.message
		});
	});
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
	const id = req.params.id;
	await UserModel.findByIdAndRemove(id).then(data => {
		if (!data) {
			res.status(404).json({
				message: `User not found.`
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
