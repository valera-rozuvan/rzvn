const { SuperAdminModel } = require('../models');
const { randomPassword, randomString } = require('../utils');
const { ObjIdValidator, SuperAdminCreateValidator, SuperAdminUpdateValidator } = require('../validators');

class SuperAdminController {
  constructor() {
    this.dbSuperAdminDataToJson = this.dbSuperAdminDataToJson.bind(this);
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  dbSuperAdminDataToJson(data) {
    return {
      email: data.email,
      password: data.password,
      authToken: data.authToken,
      isActive: data.isActive,
      createdAt: data.createdAt,
      id: data._id.toString(),
    };
  }

  // Create and save a new super admin.
  async create(req, res) {
    const validationResults = SuperAdminCreateValidator.validate(req.body);
    if (!validationResults.valid) {
      return res.status(400).json({
        message: 'Bad input data.',
        errors: validationResults.errors,
      });
    }

    const superAdminModel = new SuperAdminModel(req.body);

    let data;

    try {
      data = await superAdminModel.save();
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while creating super admin.',
      });
    }

    const superAdmin = this.dbSuperAdminDataToJson(data);

    return res.status(200).json(
      superAdmin,
    );
  }

  // Retrieve all super admins.
  async findAll(req, res) {
    let data;

    try {
      data = await SuperAdminModel.find();
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while getting all super admins.',
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

    const superAdmins = data.map((appData) => this.dbSuperAdminDataToJson(appData));

    return res.status(200).json(
      superAdmins,
    );
  }

  // Find a single super admin with a given id.
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
      data = await SuperAdminModel.findById(objId);
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while getting super admin.',
      });
    }

    if (!data) {
      return res.status(404).json({
        message: 'Super admin not found.',
      });
    }

    const superAdmin = this.dbSuperAdminDataToJson(data);

    return res.status(200).json(
      superAdmin,
    );
  }

  // Update a single super admin with a given id.
  async update(req, res) {
    let validationResults = SuperAdminUpdateValidator.validate(req.body);
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
      data = await SuperAdminModel.findByIdAndUpdate(objId, req.body, { useFindAndModify: false, new: true });
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while updating super admin.',
      });
    }

    if (!data) {
      return res.status(404).json({
        message: 'Super admin not found.',
      });
    }

    const superAdmin = this.dbSuperAdminDataToJson(data);

    return res.status(200).json(
      superAdmin,
    );
  }

  // Update the password of a single super admin with a given id.
  async updatePassword(req, res) {
    req.body = {
      password: randomPassword(),
      authToken: randomString(64),
    };

    return this.update(req, res);
  }

  // Delete a single super admin with a given id.
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
      data = await SuperAdminModel.findByIdAndRemove(objId);
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while deleting super admin.',
      });
    }

    if (!data) {
      return res.status(404).json({
        message: 'Super admin not found.',
      });
    }

    return res.status(200).json({
      status: 'OK',
    });
  }
}

module.exports = { SuperAdminController };
