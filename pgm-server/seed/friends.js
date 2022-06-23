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

        seedDb();
    });
}
function generate() {
    return Date.now() + (Math.floor(Math.random() * 100))
}
function generateName() {
    const names = ["Rosa", "Mike", "Anna", "Nina", "Peter", "Emma", "Astrid", "Polly", "Evan", "Misha", "Elsa", "Liana"];
    const randName = names[Math.floor(Math.random() * names.length)];
    return randName;
}
function seedDb() {
    for (let i = 0; i < 6; i++) {
        const friend = new FriendModel({
            publicKey: generate(),
            userId: generate(),
            name: generateName(),
        });

        friend.save().then(() => console.log('ok'))
    }

}
function stopMongo() {
    mongoose.connection.close();
    process.exit(0);
}

initMongo();