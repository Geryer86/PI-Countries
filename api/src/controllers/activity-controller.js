const { Country, Activity, Country_activities } = require('../db')
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize');
const getActivity = require('../functions/getActivities')

router.post('/', async (req, res, next) => {
  const { name, difficulty, duration, season, countryID } = req.body
  try {
    if (name && difficulty && duration && season && countryID) {
      
      // const newActivity = await Activity.create({
      //   name, difficulty, duration, season
      // })

      const [newActivity, created] = await Activity.findOrCreate({
        where:{
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season,
        },
        include: [{
          model: Country,
          where: { id: countryID }
      }]
    })

      const countryFind = await Country.findAll({
        where: {
          id: {
            [Op.or]: countryID
          }
        }
      })
      
      await newActivity.addCountries(countryFind)
      
      // await countryFind.forEach((e) => {
      //   return newActivity.addCountry(e.countryFind) //e.dataValues.id
      // });
      
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