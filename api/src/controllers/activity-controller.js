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
      const activityExist = await Activity.findOne({
        where: {
          name: name,
          difficulty: difficulty,
          duration: duration,
          season: season
        },
        include: [{
          model: Country,
          where: { name: countries }
        }]     
      });
      if (activityExist === null) {
        const [newActivity, created] = await Activity.findOrCreate({
          where:{
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season,
          },
        });
        const countryFind = await Country.findAll({
          where: {
            name: {
              [Op.or]: countries,
            }
          },
        });
        await newActivity.addCountries(countryFind);
        console.log("CREADA")
        res.send('Activity created');
      } else {
        console.log("NO CREADA")
        return res.status(409).send("Activity already exist in some of the selected countries")
      }
      // const [newActivity, created] = await Activity.findOrCreate({
      //   where: {
      //     name: name,
      //     difficulty: difficulty,
      //     duration: duration,
      //     season: season
      //   },
      //   include: [{
      //     model: Country,
      //     where: {
      //       name: countries
      //     }
      //   }]
      // })
      // const countryFind = await Country.findAll({
      //   where: {
      //     name: {
      //       [Op.or]: countries
      //     }
      //   }
      // })
      // await newActivity.addCountries(countryFind)
      // if (!created) {
      //   console.log("YA EXISTE")
      //   res.send("LA ACTIVIDAD YA EXISTE EN ALGUNO DE LOS PAISES SELECCIONADOS")
      // } if(created) 
      // res.status(201).send(newActivity)
      // console.log("CREADA")
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
    //console.log(activities)
  } catch (error) {
    console.log("No anduvo")
    next(error)
  }
})

module.exports = router;

/* {
    "name": "Correr",
    "difficulty": "1",
    "duration": 2,
    "season": "Summer",
    "countries": ["Albania", "Argentina"]
 } */