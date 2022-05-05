const { UserModel } = require('../models');
const { ObjIdValidator, UserCreateValidator, UserUpdateValidator } = require('../validators');

class UserController {
  constructor() {
    this.dbUserDataToJson = this.dbUserDataToJson.bind(this);
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  dbUserDataToJson(data) {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      isActive: data.isActive,
      createdAt: data.createdAt,
      id: data._id.toString(),
    };
  }

  // Create and save a new user.
  async create(req, res) {
    const validationResults = UserCreateValidator.validate(req.body);
    if (!validationResults.valid) {
      return res.status(400).json({
        message: 'Bad input data.',
        errors: validationResults.errors,
      });
    }

    const userModel = new UserModel(req.body);

    let data;

    try {
      data = await userModel.save();
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while creating user.',
      });
    }

    const user = this.dbUserDataToJson(data);

    return res.status(200).json(
      user,
    );
  }

  // Retrieve all users.
  async findAll(req, res) {
    let data;

    try {
      data = await UserModel.find();
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while getting all users.',
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

    const users = data.map((userData) => this.dbUserDataToJson(userData));

    return res.status(200).json(
      users,
    );
  }

  // Find a single user with a given id.
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
      data = await UserModel.findById(objId);
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while getting user.',
      });
    }

    if (!data) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    const user = this.dbUserDataToJson(data);

    return res.status(200).json(
      user,
    );
  }

  // Update a single user with a given id.
  async update(req, res) {
    let validationResults = UserUpdateValidator.validate(req.body);
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
      data = await UserModel.findByIdAndUpdate(objId, req.body, { useFindAndModify: false, new: true });
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while updating user.',
      });
    }

    if (!data) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    const user = this.dbUserDataToJson(data);

    return res.status(200).json(
      user,
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
      data = await UserModel.findByIdAndRemove(objId);
    } catch (err) {
      return res.status(500).json({
        message: err.message || 'Some error occurred while deleting user.',
      });
    }

    if (!data) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      status: 'OK',
    });
  }
}

module.exports = { UserController };
