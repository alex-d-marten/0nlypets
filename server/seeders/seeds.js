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
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        let friendId = userId;

        while (friendId === userId) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        friendId = createdUsers.ops[randomUserIndex];
        }

        await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    }

    // create posts
    let createdPosts = [];
    for (let i = 0; i < 100; i += 1) {
        const petName = faker.lorem.words(1);
        const caption = faker.lorem.words(5);
        const image = faker.lorem.words(30);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];

        const createdPost = await Post.create({ petName, caption, image, username }); 

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { posts: createdPost._id } }
        );

        createdPosts.push(createdPost)
    }

    // Create comments
    for (let i = 0; i< 100; i += 1) {
        const commentText = faker.lorem.words(10);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
        const { _id: postId } = createdPosts[randomPostIndex];

        await Post.updateOne(
            { _id: postId },
            { $push: { comments: { commentText, username } } },
            { runValidators: true }
        );
    }

    console.log('Seeding completed!')
    process.exit(0);
})