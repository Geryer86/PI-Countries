const { DataTypes }= require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        difficult:{
            type: DataTypes.ENUM({
            values: ['1','2','3','4','5']
            })
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: true,
            validate:{
                min:1,
                max:24,
            }
        },
        season:{
            type: DataTypes.ENUM({
            values: ['Summer', 'Fall', 'Spring', 'Winter']
            })
        },
        type:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {timestamps: false})
}