const SuperAdminModel = require('../model/superAdmin')
const { randomPassword, randomString } = require('../utils/rnd');

// Create and Save a new superAdmin
exports.create = async (req, res) => {
  if (!req.body.email && !req.body.password && !req.body.authToken) {
    return res.status(400).json({message: "Content can not be empty!"});
  }
  const superAdmin = new SuperAdminModel({
    email: req.body.email,
    password: req.body.password,
    authToken: req.body.authToken,
  });

  await superAdmin.save().then(data => {
    res.json({
      email: data.email,
      password: data.password,
      authToken: data.authToken,
      createdAt: data.createdAt,
      id: data._id.toString()
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message || "Some error occurred while creating user"
    });
  });
};

// Retrieve all superAdmins from the database.
exports.findAll = async (req, res) => {
  try {
    const superAdmins = await SuperAdminModel.find();
    const newSuperAdmins = superAdmins.map(superAdmin => {
      return {
        email: superAdmin.email,
        password: superAdmin.password,
        authToken: superAdmin.authToken,
        createdAt: superAdmin.createdAt,
        id: superAdmin._id.toString()
      }
    })
    res.status(200).json(newSuperAdmins);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

// Find a single superAdmin with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const superAdmin = await SuperAdminModel.findById(id);
    const newSuperAdmin = {
      email: superAdmin.email,
      password: superAdmin.password,
      authToken: superAdmin.authToken,
      createdAt: superAdmin.createdAt,
      id: superAdmin._id.toString()
    }
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

// Update a superAdmin by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  await SuperAdminModel.findByIdAndUpdate(id, req.body, {useFindAndModify: false, new: true}).then(data => {
    if (!data) {
      res.status(404).json({
        message: `SuperAdmin not found.`
      });
    } else {
      res.json({
        email: data.email,
        password: data.password,
        authToken: data.authToken,
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

// Update the password of a superAdmin by the id in the request
exports.updatePassword = async (req, res) => {
  const id = req.params.id;
  const updatedData = {
    password: randomPassword(),
    authToken: randomString(64),
  };
  await SuperAdminModel.findByIdAndUpdate(id, updatedData, {useFindAndModify: false, new: true}).then(data => {
    if (!data) {
      res.status(404).json({
        message: `SuperAdmin not found.`
      });
    } else {
      res.json({
        email: data.email,
        password: data.password,
        authToken: data.authToken,
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

// Delete a superAdmin with the specified id in the request
exports.destroy = async (req, res) => {
  const id = req.params.id;
  await SuperAdminModel.findByIdAndRemove(id).then(data => {
    if (!data) {
      res.status(404).json({
        message: `SuperAdmin not found.`
      });
    } else {
      res.json({status: 'ok'});
    }
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};
