const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    released: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    omdb_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    poster_url: {
        type: DataTypes.STRING,
    },
}, 
{
    sequelize,
    timestamps: false,
    modelName: 'movie',
});

module.exports = Movie;