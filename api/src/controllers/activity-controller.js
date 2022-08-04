const { Country, Activity, Country_activities } = require('../db')
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize');
const { getActivity, getActivityById } = require('../functions/getActivities')

router.post("/", async (req, res, next) => {
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
          where: {
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
        console.log("created")
        res.send("Activity created");
      } else {
        console.log("not created")
        return res.status(500).send("Activity already exist in some of the selected countries")
      }
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
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const activities = await Activity.findByPk(id)
    await activities.destroy()
    res.send(activities)
    //res.send("Activity deleted")
  } catch (error) {
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

