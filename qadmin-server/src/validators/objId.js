class ObjIdValidator {
  constructor(id) {
    const errors = [];
    let valid = true;
    let objId = null;

    if (typeof id !== 'string' || id.length === 0) {
      errors.push("Property `req.params.id` can not be empty. It should be a String.");
      valid = false;

      return { valid, errors, objId };
    }

    try {
      objId = new ObjectId(id);
    } catch (err) {
      errors.push(`Improper ObjectId '${id}'`);
      valid = false;

      return { valid, errors, objId };
    }

    return { valid, errors, objId }
  }
}

module.exports = { ObjIdValidator };
