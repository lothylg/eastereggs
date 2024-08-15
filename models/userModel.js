const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); // Import bcrypt

class User extends Model {
    // Method to check password validity
    async checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        }
    },
    {
        hooks: {
            beforeCreate: async (newUser) => {
                try {
                    newUser.password = await bcrypt.hash(newUser.password, 10);
                    return newUser;
                } catch (err) {
                    console.error('Error hashing password on create:', err);
                    throw err; 
                }
            },
            beforeUpdate: async (updatedUser) => {
                try {
                    if (updatedUser.changed('password')) {
                        updatedUser.password = await bcrypt.hash(
                            updatedUser.password,
                            10
                        );
                    }
                    return updatedUser;
                } catch (err) {
                    console.error('Error hashing password on update:', err);
                    throw err; 
                }
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;
