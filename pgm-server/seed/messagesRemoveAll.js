const MessageModel = require('../src/model/message')
const envVariables = require('../src/utils/envVariables');

const mongoose = require('mongoose');

function initMongo() {
    console.log('Trying to connect to MongoDB...');

    mongoose.connect(envVariables.MONGO_URL, null, (err) => {
        if (err) {
            console.error('Could not connect to the database', err);
            process.exit(1);

            return;
        }

        console.log("Connected to MongoDB database successfully.");

        removeAllMessages();
    });
}

async function removeAllMessages() {
    const messages = await MessageModel.deleteMany();
    console.log('deleted messages');
}
function stopMongo() {
    mongoose.connection.close();
    process.exit(0);
}

initMongo();