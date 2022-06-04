const { Activity, Country } = require('../db')
const { Op } = require("sequelize");

async function getActivity(name) {
  if (name) {
    const activities = Activity.findAll({
      include: [{
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        }
      }],
      where: {
        name: {
          [Op.iLike]: name
        },
      },
    });
    return activities
  } else {
    const activities = Activity.findAll({
      include: [{
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        }
      }]
    })
    return activities
  }
};

module.exports = getActivity;