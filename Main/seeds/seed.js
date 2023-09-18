const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./comment.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blogpost.create({
      ...blog
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment
    });
  }

  process.exit(0);
};



seedDatabase();
