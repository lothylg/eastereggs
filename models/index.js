
const Discussion = require('./discussionModel')
const User = require('./userModel');
const Comment = require('./commentModel')


User.hasMany(Discussion, {
  foreignKey: 'user_id'
});

Discussion.belongsTo(User, {
  foreignKey: 'user_id'
});

Discussion.hasMany(Comment,{
  foreignKey: 'discussion_id'
  })
  
Comment.belongsTo(Discussion,{
  foreignKey: 'discussion_id'
  })

  module.exports = { User, Discussion, Comment };