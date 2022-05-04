const { validAuthCredentials } = require('../constants');

class AuthController {
  constructor() {
    this.matchEmailAndPassword = this.matchEmailAndPassword.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  matchEmailAndPassword(email, password) {
    const match = validAuthCredentials.find(
      (credentials) => credentials.email === email && credentials.password === password,
    );

    return match;
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

    const match = this.matchEmailAndPassword(email, password);
    if (!match) {
      return res.status(400).json({
        message: 'Bad auth credentials.',
      });
    }

    return res.status(200).json(match);
  }
}

module.exports = { AuthController };
