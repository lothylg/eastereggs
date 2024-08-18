const sequelize = require('../config/connection');
const { User, Discussion, Comment } = require('../models');

const userData = require('./userData.json');
const discussionData = require('./discussionData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed users
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed discussions
    await Discussion.bulkCreate(discussionData, {
      returning: true,
    });

    console.log('Discussions seeded successfully');

    // Seed comments
    // await Comment.bulkCreate(commentData, {
    //   returning: true,
    // });

    console.log('Comments seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();