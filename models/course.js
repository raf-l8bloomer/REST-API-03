'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model { }
    Course.init({
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        estimatedTime: {
            type: DataTypes.STRING
        }, 
        materialsNeeded: {
            type: DataTypes.STRING
        },
        
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User, { foreignKey: 'userId'});
    }

    return Course;
}

/* On number 4 - Define the Models > userId (created in the model associations with 
    the foreignKey property, and equals the id from the Users table)
    */