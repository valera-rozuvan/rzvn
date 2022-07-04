const UserModel = require('../model/user')

// Find a single user 
exports.findUserToLogin = async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    try {
        const userData = await UserModel.find();
        const user = userData.find((user) => (user.name === name) && (user.password === password));

        const newUser = {
            name: user.name,
            password: user.password,
            createdAt: user.createdAt,
            id: user.id.toString()
        }
        res.status(200).json(newUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};