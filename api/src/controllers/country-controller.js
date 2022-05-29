const { Country, Activity } = require('../db')
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize')


router.get('/', async (req, res, next) => {
  const { name, order, page, filter } = req.query;
  try {
    // const allCountries = await Country.findAll();
    // const allCountries = (await axios('https://restcountries.com/v3/all')).data.map(e => ({
    //   id: e.ccn3,
    //   name: e.name.common,
    //   image: e.flags[0],
    //   continent: e.continents[0],
    //   capital: e.capital || ["Has no capital"],
    //   subRegion: e.subregion || "Does not have",
    //   area: e.area,
    //   population: e.population
    // }));
    if (name) {
      const countryByName = await Country.findAll({
        where: {
          name: {[Op.iLike]: `%${name}%`}
        },
        limit: 10,
        offset: page,
        order: [[req.query.orderBy, req.query.order]],
        include: Activity
      })
      console.log("Country by NAME");
      res.send(countryByName);
      // const countryByName = await allCountries.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
      // if (countryByName.length) {
      //   res.json(countryByName);
      //   console.log("Country by NAME");
      // } else {
      //   res.send("Country does not exist (yet)")
      // }
    } else if(filter) {
      const countriesQueryFilter = await Country.findAll({
        where: {
          status: filter
        },
        limit: 10,
        offset: page,
        order: [[req.query.orderBy, req.query.order]],
        include: Activity
      })
      res.json(countriesQueryFilter)
      console.log("Country by queryfilter")
    } else {
      const allTenCountries = await Country.findAll({
        limit: 10,
        offset: page,
        order: [[req.query.orderBy, req.query.order]],
        include: Activity
      })
      res.json(allTenCountries)
      //res.json(allCountries)
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
    if (country) {
      res.status(200).json(country)
      console.log("Country by ID")
    }
    else res.status(400).send('ID does not match')
  } catch (err) {
    next(err)
  }
});

module.exports = router;
