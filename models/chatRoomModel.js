const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ChatRoom extends Model {}

ChatRoom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    discussion_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'discussion', 
        key: 'id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comment', 
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chat-room'
  }
);

module.exports = ChatRoom;