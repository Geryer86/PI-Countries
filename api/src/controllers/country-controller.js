const { Country, Activity } = require('../db')
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize')


router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    const allCountries = (await axios('https://restcountries.com/v3/all')).data.map(e => ({
      id: e.ccn3,
      name: e.name.common,
      image: e.flags[0],
      continent: e.continents[0],
      capital: e.capital || ["Has no capital"],
      subRegion: e.subregion || "Does not have",
      area: e.area,
      population: e.population
    }));
    if (name) {
      const allCountriesFilter = await allCountries.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
      if (allCountriesFilter.length) {
        res.json(allCountriesFilter);
        console.log("If name if");
      } else {
        res.send("Country does not exist (yet)")
        console.log("If name else");
      }
    } else {
      res.json(allCountries)
      console.log("All countries");
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const idCountry = req.params.id;
  const idCountryM = idCountry.toUpperCase()
  try {
    const country = await Country.findOne({
      where: { 
        id: idCountryM
      },
      include: Activity
    });
    if (country) return res.status(200).json(country);
    else res.status(400).send('Id no match')
  } catch (err) {
    next(err)
  }
});

module.exports = router;
