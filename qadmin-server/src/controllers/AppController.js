const { AppModel } = require('../models');
const { ObjIdValidator, AppCreateValidator, AppUpdateValidator } = require('../validators');

class AppController {
  constructor() {
    this.dbAppDataToJson = this.dbAppDataToJson.bind(this);
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  dbAppDataToJson(data) {
    return {
      serviceName: data.serviceName,
      publicKey: data.publicKey,
      privateKey: data.privateKey,
      isActive: data.isActive,
      callbackUrl: data.callbackUrl,
      createdAt: data.createdAt,
      id: data._id.toString(),
    };
  }

  // Create and save a new app.
  async create(req, res) {
    const validationResults = AppCreateValidator.validate(req.body);
    if (!validationResults.valid) {
      return res.status(400).json({
        message: 'Bad input data.',
        errors: validationResults.errors,
      });
    }

    const appModel = new AppModel(req.body);

    let data;

    try {
      data = await appModel.save();
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while creating app.',
      });
    }

    const app = this.dbAppDataToJson(data);

    return res.status(200).json(
      app,
    );
  }

  // Retrieve all apps.
  async findAll(req, res) {
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
      return res.status(200).json(
        [],
      );
    }

    const apps = data.map((appData) => this.dbAppDataToJson(appData));

    return res.status(200).json(
      apps,
    );
  }

  // Find a single app with a given id.
  async findOne(req, res) {
    const { id } = req.params;

    const validationResults = new ObjIdValidator(id).validate();
    if (!validationResults.valid) {
      return res.status(400).json({
        message: 'Bad input data.',
        errors: validationResults.errors,
      });
    }

    const { objId } = validationResults;
    let data;

    try {
      data = await AppModel.findById(objId);
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

    const app = this.dbAppDataToJson(data);

    return res.status(200).json(
      app,
    );
  }

  // Update a single app with a given id.
  async update(req, res) {
    let validationResults = AppUpdateValidator.validate(req.body);
    if (!validationResults.valid) {
      return res.status(400).json({
        message: 'Bad input data.',
        errors: validationResults.errors,
      });
    }

    const { id } = req.params;

    validationResults = new ObjIdValidator(id).validate();
    if (!validationResults.valid) {
      return res.status(400).json({
        message: 'Bad input data.',
        errors: validationResults.errors,
      });
    }

    const { objId } = validationResults;
    let data;

    try {
      data = await AppModel.findByIdAndUpdate(objId, req.body, { useFindAndModify: false, new: true });
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

    const app = this.dbAppDataToJson(data);

    return res.status(200).json(
      app,
    );
  }

  // Delete a single app with a given id.
  async destroy(req, res) {
    const { id } = req.params;

    const validationResults = new ObjIdValidator(id).validate();
    if (!validationResults.valid) {
      return res.status(400).json({
        message: 'Bad input data.',
        errors: validationResults.errors,
      });
    }

    const { objId } = validationResults;
    let data;

    try {
      data = await AppModel.findByIdAndRemove(objId);
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

    return res.status(200).json({
      status: 'OK',
    });
  }
}

module.exports = { AppController };
