const { Country, Activity, Country_activities } = require('../db')
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize')

router.post('/', async (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body
  try {
    if (name && difficulty && duration && season && countries) {
      const newActivity = await Activity.create({
        name, difficulty, duration, season
      })
      const countryFind = await Country.findAll({
        where: {
          name: {
            [Op.or]: countries
          }
        }
      })
      countryFind.forEach(e => {
        return newActivity.addCountry(e.dataValues.id)
      });
      res.status(201).send("Activity succefully uploaded")
    } else res.status(404).json("Missing data")
  } catch (err) {
    next(err)
  }
})

module.exports = router;