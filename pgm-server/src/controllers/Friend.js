const FriendModel = require('../model/friend')

// Create and Save a new friend
exports.create = async (req, res) => {
  // console.log(req.body);
  if (!req.body.publicKey && !req.body.name) {
    return res.status(400).json({ message: "Content can not be empty!" });
  }
  const friend = new FriendModel({
    publicKey: req.body.publicKey,
    authorPublicKey: req.body.authorPublicKey,
    // userId: '1111',
    name: req.body.name,
  });

  await friend.save().then(data => {
    res.json({
      publicKey: data.publicKey,
      authorPublicKey: data.authorPublicKey,
      name: data.name,
      createdAt: data.createdAt,
      id: data._id.toString()
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message || "Some error occurred while creating friend"
    });
  });
};

// Retrieve all friends from the database.
exports.findAll = async (req, res) => {
  try {
    const friends = await FriendModel.find();
    const newFriends = friends.map(friend => {
      return {
        publicKey: friend.publicKey,
        authorPublicKey: friend.authorPublicKey,
        name: friend.name,
        createdAt: friend.createdAt,
        id: friend._id.toString()
      }
    })
    res.status(200).json(newFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Find all friends of user pk by authorPublicKey value
exports.findFriendsOfCurrentUserPublicKey = async (req, res) => {
  const currentAuthorPublicKey = req.params.authorPublicKey;
  try {
    const friends = await FriendModel.find();
    const newFriends = friends.filter(friend => friend.authorPublicKey === currentAuthorPublicKey);

    res.status(200).json(newFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single Friend with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const friend = await FriendModel.findById(id);
    const newFriend = {
      publicKey: friend.publicKey,
      authorPublicKey: friend.authorPublicKey,
      name: friend.name,
      createdAt: friend.createdAt,
      id: friend._id.toString()
    }
    res.status(200).json(newFriend);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a friend by the id in the request
exports.update = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({
      message: "Data to update can not be empty!"
    });
  }
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name is required!"
    });
  }
  const id = req.params.id;
  await FriendModel.findByIdAndUpdate(id, { name: req.body.name }, { useFindAndModify: false, new: true }).then(data => {
    if (!data) {
      res.status(404).json({
        message: `Friend not found.`
      });
    } else {
      res.json({
        publicKey: data.publicKey,
        authorPublicKey: data.authorPublicKey,
        name: data.name,
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

// Delete a friend with the specified id in the request
exports.destroy = async (req, res) => {
  const id = req.params.id;
  await FriendModel.findByIdAndRemove(id).then(data => {
    if (!data) {
      res.status(404).json({
        message: `Friend not found.`
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
