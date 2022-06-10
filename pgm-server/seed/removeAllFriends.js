const FriendModel = require('../src/model/friend')
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

        removeAllFriends();
    });
}

async function removeAllFriends() {
    const friends = await FriendModel.deleteMany();
    console.log('removed whole model with friends');
}
function stopMongo() {
    mongoose.connection.close();
    process.exit(0);
}

initMongo();