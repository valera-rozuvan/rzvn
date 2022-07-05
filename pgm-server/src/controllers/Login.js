const UserModel = require('../model/user')

// Find a single user 
exports.findUserToLogin = async (req, res) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    try {
        const userData = await UserModel.find();
        const user = userData.find((user) => (user.userName === userName) && (user.userPassword === userPassword));

        const newUser = {
            userName: user.userName,
            userPassword: user.userPassword,
            createdAt: user.createdAt,
            id: user.id.toString()
        }
        res.status(200).json(newUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};