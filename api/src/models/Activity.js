const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM({
        values: ["1", "2", "3", "4", "5"]
      })
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 24
      }
    },
    season: {
      type: DataTypes.ENUM({
        values: ["Summer", "Autumn", "Spring", "Winter"]
      })
    },
    // id: {
    //   type: DataTypes.INTEGER,
    //   //defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    //   unique: true,
    //   //allowNull: false,
    // }
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};