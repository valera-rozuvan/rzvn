const mongoose = require('mongoose');

class ObjIdValidator {
  constructor(id) {
    this.id = id;
  }

  validate() {
    const errors = [];
    let valid;
    let objId;

    if (typeof this.id !== 'string') {
      errors.push('Property `id` should be a string.');
    } else if (this.id.length === 0) {
      errors.push('Property `id` should be a non-empty string.');
    }

    try {
      objId = new mongoose.Types.ObjectId(this.id);
    } catch (err) {
      errors.push('Property `id` should be a valid ObjectId string.');
    }

    if (errors.length > 0) {
      valid = false;
    } else {
      valid = true;
    }

    return { valid, errors, objId };
  }
}

module.exports = { ObjIdValidator };
