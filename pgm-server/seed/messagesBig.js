const MessageModel = require('../src/model/message')
const FriendModel = require('../src/model/friend')
const envVariables = require('../src/utils/envVariables');

const mongoose = require('mongoose');

function initMongo() {
    console.log('Trying to connect to MongoDB...');

    mongoose.connect(envVariables.MONGO_URL, null, async (err) => {
        if (err) {
            console.error('Could not connect to the database', err);
            process.exit(1);

            return;
        }

        console.log("Connected to MongoDB database successfully.");

        await generateMessages();
        console.log('done all messages');
        stopMongo();
    });
}

function mixedMessages() {
    const greetings = ['Hi', 'Hello', 'Good morning', 'Good afernoon', 'Hey'];
    const names = ['Ross', 'Rachel', 'Monica', 'Joey', 'Chandler', 'Phoebe'];
    const questions = [
        'What is your favorite book?',
        'Do you like to cook?',
        'What is on your bucket list?',
        'What do you do for a living?',
        'Do you believe in luck?',
        'What is your hidden talent?'
    ];
    function getRandomItem(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    function createMessage() {
        const greeting = getRandomItem(greetings);
        const name = getRandomItem(names);
        const question = getRandomItem(questions);
        return `${greeting}, ${name}. ${question}`;
    }
    return createMessage();
    // console.log(createMessage());

};

async function getRandomPublicKey() {
    const friends = await FriendModel.find();
    const friendsPublicKeys = friends.map(friend => friend.publicKey);
    const randomPublicKey = friendsPublicKeys[Math.floor(Math.random() * friendsPublicKeys.length)];
    return randomPublicKey;
}

async function generateMessages() {
    const friends = await FriendModel.find();
    const friendPublicKeyFirst = await getRandomPublicKey();
    const friendPublicKeySecond = await getRandomPublicKey();
    const friendPublicKeyThird = await getRandomPublicKey();

    console.log(friendPublicKeyFirst);
    console.log(friendPublicKeySecond);
    console.log(friendPublicKeyThird);


    for (let j = 0; j < 10; j++) {
        const friendName = friends.find(friend => {
            if (friend.publicKey === friendPublicKeyFirst) {
                return friend.name
            }
        });

        const message = new MessageModel({
            recieverPublicKey: '111',
            senderPublicKey: friendPublicKeyFirst,
            name: friendName.name,
            text: mixedMessages(),
        });

        await message.save().then(() => console.log('message created'))
    };

    for (let j = 0; j < 50; j++) {
        const friendName = friends.find(friend => {
            if (friend.publicKey === friendPublicKeySecond) {
                return friend.name
            }
        });

        const message = new MessageModel({
            recieverPublicKey: '222',
            senderPublicKey: friendPublicKeySecond,
            name: friendName.name,
            text: mixedMessages(),
        });

        await message.save().then(() => console.log('message created'))
    };

    for (let j = 0; j < 200; j++) {
        const friendName = friends.find(friend => {
            if (friend.publicKey === friendPublicKeyThird) {
                return friend.name
            }
        });

        const message = new MessageModel({
            recieverPublicKey: '333',
            senderPublicKey: friendPublicKeyThird,
            name: friendName.name,
            text: mixedMessages(),
        });

        await message.save().then(() => console.log('message created'))
    };

};


function stopMongo() {
    mongoose.connection.close();
    process.exit(0);
}

initMongo();