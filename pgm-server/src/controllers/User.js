const UserModel = require('../model/user')

// Create and Save a new user
exports.create = async (req, res) => {
//   console.log(req.body);
  if (!req.body.userName || !req.body.userPassword ) {
    return res.status(400).json({message: "Content can not be empty!"});
  }
  const user = new UserModel({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
  });

  await user.save().then(data => {
    res.json({
      userName: data.userName,
      userPassword: data.userPassword,
      id: data._id.toString(),
      createdAt: data.createdAt,
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message || "Some error occurred while creating user"
    });
  });
};

// Retrieve all user from the database.
exports.findAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    const newUsers = users.map(user => {
      return {
        userName: user.userName,
        userPassword: user.userPassword,
        id: user._id.toString(),
        createdAt: user.createdAt,
      }
    })
    res.status(200).json(newUsers);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

// Find a single user with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    const newUser = {
      userName: user.userName,
      userPassword: user.userPassword,
      createdAt: user.createdAt,
      id: user._id.toString()
    }
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

// Update a user by the id in the request
exports.update = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({
      message: "Data to update can not be empty!"
    });
  }
  if (!req.body.userName) {
    return res.status(400).json({
      message: "Name is required!"
    });
  }
  const id = req.params.id;
  await UserModel.findByIdAndUpdate(id, {userName: req.body.userName}, {useFindAndModify: false, new: true}).then(data => {
    if (!data) {
      res.status(404).json({
        message: `Friend not found.`
      });
    } else {
      res.json({
        userName: data.userName,
        userPassword: data.userPassword,
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

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id).then(data => {
    if (!data) {
      res.status(404).json({
        message: `User not found.`
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


// Delete all users
exports.destroyAll = async (req, res) => {
    await UserModel.remove().then(data => {
        // console.log(UserModel);
        if (!data) {
            res.status(404).json({
                message: `Users not found.`
            });
        } else {
            res.json({ status: 'ok' });
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
  };