const sequelize = require('../config/config');
const { User, Post, Comment } = require('../models');
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const seedAll = async () => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  
    await Comment.drop();
    console.log('\n----- COMMENTS DROPPED -----\n');
  
    await Post.drop();
    console.log('\n----- POSTS DROPPED -----\n');
  
    await User.drop();
    console.log('\n----- USERS DROPPED -----\n');
  
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
  
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
  
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
  
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

seedAll();






  