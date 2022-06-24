// const message = require('../model/message');
const MessageModel = require('../model/message')

// Create and Save a new message
exports.create = async (req, res) => {
    console.log(req.body.text, req.body);
    if (!req.body.text) {
        return res.status(400).json({ message: "Message can not be empty!" });
    }
    const message = new MessageModel({
        recieverPublicKey:req.body.recieverPublicKey,
        senderPublicKey:req.body.senderPublicKey,
        name: req.body.name,
        text: req.body.text,
    });

    await message.save().then(data => {
        res.json({
            recieverPublicKey: data.recieverPublicKey,
            senderPublicKey:data.senderPublicKey,
            name: data.name,
            text: data.text,
            createdAt: data.createdAt,
            id: data._id.toString()
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating message"
        });
    });
};

// Retrieve all messages from the database.
exports.findAll = async (req, res) => {
    try {
        const messages = await MessageModel.find();
        const newMessage = messages.map(message => {
            return {
                recieverPublicKey: message.recieverPublicKey,
                senderPublicKey:message.senderPublicKey,
                name: message.name,
                text: message.text,
                createdAt: message.createdAt,
                id: message._id.toString()
            }
        })
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single Message with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const message = await MessageModel.findById(id);
        const newMessage = {
            recieverPublicKey: message.recieverPublicKey,
            senderPublicKey:message.senderPublicKey,
            name: message.name,
            text: message.text,
            createdAt: message.createdAt,
            id: message._id.toString()
        }
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a message by the id in the request
exports.update = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            message: "Data to update can not be empty!"
        });
    }
    if (!req.body.text) {
        return res.status(400).json({
            message: "Text is required!"
        });
    }
    const id = req.params.id;
    await MessageModel.findByIdAndUpdate(id, { text: req.body.text }, { useFindAndModify: false, new: true }).then(data => {
        if (!data) {
            res.status(404).json({
                message: `Message not found.`
            });
        } else {
            res.json({
                recieverPublicKey: data.recieverPublicKey,
                senderPublicKey:data.senderPublicKey,
                name: data.name,
                text: data.text,
                createdAt: data.createdAt,
                id: data._id.toString()
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
};

// Delete a Message with the specified id in the request
exports.destroy = async (req, res) => {
    const id = req.params.id;
    await MessageModel.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).json({
                message: `Message not found.`
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