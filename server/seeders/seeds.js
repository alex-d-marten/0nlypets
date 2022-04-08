const faker = require('faker');

const db = require('../config/connection');
const { Post, User } = require('../models');

db.once('open', async () => {
    await Post.deleteMany({});
    await User.deleteMany({});

    // creating the user data
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        userData.push({ username, email, password });
    }

    const createdUsers = await User.collection.insertMany(userData);

    // creating the friends for users
    for (let i = 0; i < 100; i += 1) {

    }
})