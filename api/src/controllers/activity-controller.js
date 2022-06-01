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
      const [newActivity, created] = await Activity.findOrCreate({
        where: {
          name: name,
          difficulty: difficulty,
          duration: duration,
          season: season
        },
        include: [{
          model: Country,
          where: {
            name: countries
          }
        }]
      })
      const countryFind = await Country.findAll({
        where: {
          name: {
            [Op.or]: countries
          }
        }
      })
      await newActivity.addCountries(countryFind)
      if (!created) {
        console.log("YA EXISTE")
        res.status(400).send("LA ACTIVIDAD YA EXISTE EN ALGUNO DE LOS PAISES SELECCIONADOS")
      } else res.status(201).send(newActivity)
        console.log("CREADA")
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
    console.log("DAVID")
  } catch (error) {
    console.log("No anduvo")
    next(error)
  }
})

module.exports = router;