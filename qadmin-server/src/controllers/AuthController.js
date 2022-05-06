const jwt = require('jsonwebtoken');

const { findAllSuperAdmins } = require('../utils');

class AuthController {
  constructor() {
    this.findSuperAdmin = this.findSuperAdmin.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  async findSuperAdmin(email, password) {
    const superAdmins = await findAllSuperAdmins();

    return superAdmins.find(
      (superAdmin) => superAdmin.email === email && superAdmin.password === password,
    );
  }

  async getToken(req, res) {
    if (!req.body) {
      return res.status(400).json({ message: "'req.body' must be defined" });
    }

    if (typeof req.body.email !== 'string') {
      return res.status(400).json({ message: "'req.body.email' must be a string" });
    }
    const { email } = req.body;

    if (typeof req.body.password !== 'string') {
      return res.status(400).json({ message: "'req.body.password' must be a string" });
    }
    const { password } = req.body;

    let superAdmin;

    try {
      superAdmin = await this.findSuperAdmin(email, password);
    } catch (err) {
      return res.status(400).json({
        message: 'Bad auth credentials.',
      });
    }

    if (!superAdmin) {
      return res.status(400).json({
        message: 'Bad auth credentials.',
      });
    }

    const jwtToken = jwt.sign(
      {
        data: {
          email: superAdmin.email,
          type: 'super_admin',
        },
      },
      superAdmin.authSecret,
      {
        expiresIn: '1h',
      },
    );

    return res.status(200).json({
      email: superAdmin.email,
      jwtToken,
    });
  }
}

module.exports = { AuthController };
