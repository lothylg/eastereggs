const sequelize = require('../config/connection');
const { User, Discussion } = require('../models');

const userData = require('./userData.json');
const projectData = require('./discussionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of discussionData) {
    await Discussion.create({
      ...discussion,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
