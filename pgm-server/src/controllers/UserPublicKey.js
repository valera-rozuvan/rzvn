const UserPublicKeyModel = require('../model/userPublicKey')

// Create and Save a new user public key
exports.create = async (req, res) => {
    // console.log(req.body);
    if (!req.body.userPublicKey || !req.body.userId) {
        return res.status(400).json({ message: "Content can not be empty!" });
    }
    const userPublicKey = new UserPublicKeyModel({
        userPublicKey: req.body.userPublicKey,
        userId: req.body.userId,
        userName: req.body.userName,
    });

    await userPublicKey.save().then(data => {
        console.log("create upk")
        console.log(data);
        res.json({
            userPublicKey: data.userPublicKey,
            userId: data.userId,
            userName: data.userName,
            id: data._id.toString(),
            createdAt: data.createdAt,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while creating user"
        });
    });
};
// Retrieve all public keys from the database.
exports.findAll = async (req, res) => {
    try {
        const publicKeys = await UserPublicKeyModel.find();
        const newUserPublicKeys = publicKeys.map(publicKey => {
            return {
                userPublicKey: publicKey.userPublicKey,
                userId: publicKey.userId,
                userName: publicKey.userName,
                id: publicKey._id.toString(),
                createdAt: publicKey.createdAt,
            }
        })
        res.status(200).json(newUserPublicKeys);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Retrieve all user public keys by user id from the database.
exports.findUserPublicKeys = async (req, res) => {
    const idOfUser = req.params.userId;
    console.log(idOfUser);
    console.log('------');
    try {
        const userPublicKeys = await UserPublicKeyModel.find();
        console.log(userPublicKeys);
        const newUserPublicKeys = userPublicKeys.filter(itemUserPublicKey => {
            console.log(itemUserPublicKey);
            console.log('+++');
            if (itemUserPublicKey.userId === idOfUser)
                return true;
        }).map(itemUserPublicKey =>
        ({
            userPublicKey: itemUserPublicKey.userPublicKey,
            userId: itemUserPublicKey.userId,
            userName: itemUserPublicKey.userName,
            id: itemUserPublicKey._id.toString(),
            createdAt: itemUserPublicKey.createdAt,
        })
        )

        res.status(200).json(newUserPublicKeys);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// Find a single public key of user with an publicKey
exports.findOneByPublicKey = async (req, res) => {
    const publicKey = req.params.userPublicKey;
    try {
        const userPublicKey = await UserPublicKeyModel.findOne({ userPublicKey: publicKey });
        const newUserPublicKey = {
            userPublicKey: userPublicKey.userPublicKey,
            userName: userPublicKey.userName,
            userId: userPublicKey.userId,
            createdAt: userPublicKey.createdAt,
            id: userPublicKey._id.toString()
        }
        res.status(200).json(newUserPublicKey);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Delete a pk with the specified id in the request
exports.destroy = async (req, res) => {
    const id = req.params.id;
    await UserPublicKeyModel.findByIdAndRemove(id).then(data => {
        // console.log(UserPublicKeyModel);
        if (!data) {
            res.status(404).json({
                message: `User Public Key not found.`
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
// Delete all public keys
exports.destroyAll = async (req, res) => {
    await UserPublicKeyModel.remove().then(data => {
        // console.log(UserPublicKeyModel);
        if (!data) {
            res.status(404).json({
                message: `User Public Keys not found.`
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