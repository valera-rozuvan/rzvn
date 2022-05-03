const AppModel = require('../model/app');
const { AppCreateValidator, AppUpdateValidator } = require('../validators/App');

// Create and save a new app.
exports.create = async (req, res) => {
  const { valid, errors } = AppCreateValidator.validate(req.body);
  if (!valid) {
    return res.status(400).json({ message: 'Bad input data.', errors });
  }

  const appModel = new AppModel({
    serviceName: req.body.serviceName,
    publicKey: req.body.publicKey,
    privateKey: req.body.privateKey,
    isActive: req.body.isActive,
    callbackUrl: req.body.callbackUrl,
  });

  let data;

  try {
    data = await appModel.save();
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Some error occurred while creating app.',
    });
  }

  const app = {
    serviceName: data.serviceName,
    publicKey: data.publicKey,
    privateKey: data.privateKey,
    isActive: data.isActive,
    callbackUrl: data.callbackUrl,
    createdAt: data.createdAt,
    id: data._id.toString(),
  };

  return res.status(200).json(app);
};

// Retrieve all apps.
exports.findAll = async (req, res) => {
  let data;

  try {
    data = await AppModel.find();
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Some error occurred while getting all apps.',
    });
  }

  if (
    !data
    || (Array.isArray(data) && data.length === 0)
  ) {
    return res.status(200).json([]);
  }

  const apps = data.map((app) => ({
    serviceName: app.serviceName,
    publicKey: app.publicKey,
    privateKey: app.privateKey,
    isActive: app.isActive,
    callbackUrl: app.callbackUrl,
    createdAt: app.createdAt,
    id: app._id.toString(),
  }));

  return res.status(200).json(apps);
};

// Find a single app with a given id.
exports.findOne = async (req, res) => {
  const { id } = req.params;

  let data;

  try {
    data = await AppModel.findById(id);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Some error occurred while getting app.',
    });
  }

  if (!data) {
    return res.status(404).json({
      message: 'App not found.',
    });
  }

  const app = {
    serviceName: data.serviceName,
    publicKey: data.publicKey,
    privateKey: data.privateKey,
    isActive: data.isActive,
    callbackUrl: data.callbackUrl,
    createdAt: data.createdAt,
    id: data._id.toString(),
  };

  return res.status(200).json(app);
};

// Update a single app with a given id.
exports.update = async (req, res) => {
  const { valid, errors } = AppUpdateValidator.validate(req.body);
  if (!valid) {
    return res.status(400).json({ message: 'Bad input data.', errors });
  }

  const { id } = req.params;

  let data;

  try {
    data = await AppModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Some error occurred while updating app.',
    });
  }

  if (!data) {
    return res.status(404).json({
      message: 'App not found.',
    });
  }

  const app = {
    serviceName: data.serviceName,
    publicKey: data.publicKey,
    privateKey: data.privateKey,
    isActive: data.isActive,
    callbackUrl: data.callbackUrl,
    createdAt: data.createdAt,
    id: data._id.toString(),
  };

  return res.status(200).json(app);
};

// Delete a single app with a given id.
exports.destroy = async (req, res) => {
  const { id } = req.params;

  let data;

  try {
    data = await AppModel.findByIdAndRemove(id);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Some error occurred while deleting app.',
    });
  }

  if (!data) {
    return res.status(404).json({
      message: 'App not found.',
    });
  }

  return res.status(200).json({ status: 'OK' });
};
