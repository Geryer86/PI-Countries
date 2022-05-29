const { Country, Activity, Country_activities } = require('../db')
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize');
const getActivity = require('../functions/getActivities')

router.post('/', async (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body
  try {
    if (name && difficulty && duration && season && countries) {
      //const countriesArray = countries.map(e=>e.countries)
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
      await countryFind.forEach((e) => {
        return newActivity.addCountry(e.dataValues.id) //e.dataValues.id
      });
      //const countriesNames = countryFind.map(e => e.name)
      //const newActivityCountries = newActivity.countries=countriesNames
      res.status(201).send(newActivity)
    } else res.status(404).json("Missing data")
  } catch (err) {
    next(err)
  }
})

router.get("/", async (req, res, next) => {
  const { name } = req.query
  try {
    const activities = await getActivity(name)
    res.send(activities)
  } catch (error) {
    console.log("No anduvo")
    next(error)
  }
})

module.exports = router;