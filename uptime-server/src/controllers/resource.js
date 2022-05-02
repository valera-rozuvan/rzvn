const ObjectId = require('mongodb').ObjectId;
const ResourceModel = require('../model/resource');
const isAuthenticated = require('../controllers/auth').isAuthenticated;

const copyResource = (
  {
    url,
    method,
    createdAt,
    isActive,
    _id
  }
) => ({
  url,
  method,
  createdAt,
  isActive,
  id: _id.toString(),
});

// Create and Save a new resource
exports.create = async (req, res) => {
  const authenticated = await isAuthenticated(req);
  if (!authenticated) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (!req.body) {
    return res.status(400).json({message: "Object `req.body` can not be empty."});
  }

  if (typeof req.body.url !== 'string' || !req.body.url.length) {
    return res.status(400).json({message: "Property `req.body.url` can not be empty. It should be a String."});
  }

  if (typeof req.body.method !== 'string' || !req.body.method.length) {
    return res.status(400).json({message: "Property `req.body.method` can not be empty. It should be a String."});
  }

  if (typeof req.body.isActive !== 'undefined' && typeof req.body.isActive !== 'boolean') {
    return res.status(400).json({message: "If set, property `req.body.isActive` should be a Boolean."});
  }

  const resource = new ResourceModel({
    url: req.body.url,
    method: req.body.method,
    isActive: !!req.body.isActive,
  });

  await resource.save().then(data => {
    if (!data || !data._id) {
      return res.status(400).json({message: `Resource was not created.`});
    }

    res.json(copyResource(data));
  }).catch(err => {
    res.status(500).json({
      message: err.message || "Some error occurred while creating resource"
    });
  });
};

// Retrieve all resources from the database.
exports.findAll = async (req, res) => {
  const authenticated = await isAuthenticated(req);
  if (!authenticated) {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const resources = await ResourceModel.find();

    if (!resources || !resources.length) {
      return res.status(200).json([]);
    }

    const newResources = resources.map(resource => copyResource(resource))
    res.status(200).json(newResources);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

// Find a single resource with a id
exports.findOne = async (req, res) => {
  const authenticated = await isAuthenticated(req);
  if (!authenticated) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (typeof req.params.id !== 'string' || !req.params.id.length) {
    return res.status(400).json({message: "Property `req.params.id` can not be empty. It should be a String."});
  }

  const id = req.params.id;
  let objId;
  try {
    objId = new ObjectId(id);
  } catch (err) {
    return res.status(400).json({message: `Improper ObjectId '${id}'`});
  }

  try {
    const resource = await ResourceModel.findById(objId);

    if (!resource || !resource._id) {
      return res.status(404).json({message: `Resource with ID '${id}' was not found.`});
    }

    res.status(200).json(copyResource(resource));
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

// Update a resource by the id in the request
exports.update = async (req, res) => {
  const authenticated = await isAuthenticated(req);
  if (!authenticated) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (!req.body) {
    return res.status(400).json({message: "Data to update can not be empty!"});
  }

  if (typeof req.params.id !== 'string' || !req.params.id.length) {
    return res.status(400).json({message: "Property `req.params.id` can not be empty. It should be a String."});
  }

  const id = req.params.id;
  let objId;
  try {
    objId = new ObjectId(id);
  } catch (err) {
    return res.status(400).json({message: `Improper ObjectId '${id}'`});
  }

  await ResourceModel.findByIdAndUpdate(objId, req.body, {useFindAndModify: false, new: true}).then(data => {
    if (!data || !data._id) {
      return res.status(404).json({message: `Resource with ID '${id}' was not found.`});
    }

    res.status(200).json(copyResource(data));
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};

// Delete a resource with the specified id in the request
exports.delete = async (req, res) => {
  const authenticated = await isAuthenticated(req);
  if (!authenticated) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (typeof req.params.id !== 'string' || !req.params.id.length) {
    return res.status(400).json({message: "Property `req.params.id` can not be empty. It should be a String."});
  }

  const id = req.params.id;
  let objId;
  try {
    objId = new ObjectId(id);
  } catch (err) {
    return res.status(400).json({message: `Improper ObjectId '${id}'`});
  }

  await ResourceModel.findByIdAndRemove(objId).then(data => {
    if (!data) {
      return res.status(404).json({message: `Resource with ID '${id}' was not found.`});
    }

    res.json({status: 'ok'});
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
};
