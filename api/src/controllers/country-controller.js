const { Country, Activity } = require('../db')
const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize')
const axios = require('axios');
const getApi = require('../db');
const getApiTxt = require('../sevices/api_countries')

// const dbCountries = axios.get('https://restcountries.com/v3/all')
// .then(res => res.data)

// dbCountries.then(r => {
//   r.map(e => {
//     Country.findOrCreate({
//       where: {
//         id: e.cca3
//       },
//       defaults: {
//         id: e.cca3,
//         name: e.name.common,
//         img: e.flags[0],
//         continent: e.continents[0],
//         capital: e.capital,
//         subregion: e.subregion,
//         area: e.area,
//         population: e.population
//       }
//     })
//   })
// });

router.get("/", async (req, res, next) => {
  try {
    const countries = await Country.findAll()
    if(!countries.length) {
      let apiCountries = getApiTxt()
      apiCountries.map((e) => {
        Country.findOrCreate({
          where: {
            id: e.cca3
          },
          defaults: {
            id: e.cca3,
            name: e.name.common,
            img: e.flags[0],
            continent: e.continents[0],
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population
          }
        })
      })
      let totalData = await Country.findAll({
        include: [{
          model: Activity,
          //attributes: ["name"],
          through: {
            attributes: []
          }
        }]
      })
      res.send(totalData);
    } else {
      let totalData = await Country.findAll({
        include: [{
          model: Activity,
          //attributes: ["name"],
          through: {
            attributes: []
          }
        }]
      })
      res.send(totalData)
    }
  } catch (error) {
    next(error)
  }
})

// router.get("/", async (req, res, next) => {
//   try {
//     const countries = await Country.findAll({
//       include: Activity
//     })
//     res.json(countries)
//   } catch (error) {
//     next(error)
//   }
// })

router.get("/filter", async (req, res, next) => {
  const { page, sort, order, continent, name } = req.query;
  try {
    if (name && continent) {
      const countries = await Country.findAll({
        where: {
          name: { [Op.iLike]: `${name}%` },
          continent: continent,
        },
        limit: 10,
        offset: page,
        include: Activity
      })
      res.json(countries)
    }
    else if (name && name.length > 1) {
      const countries = await Country.findAll({
        where: {
          name: { [Op.iLike]: `${name}%` },
        },
        limit: 10,
        offset: page,
        include: Activity
      })
      res.json(countries)
    }  
    else if (continent) {
      const countries = await Country.findAll({
        where: {
          continent: continent
        },
        limit: 10,
        offset: page,
        order: [[sort, order]],
        include: Activity
      })
      res.json(countries)
    } 
    else if (sort && order) {
      const countries = await Country.findAll({
        limit: 10,
        offset: page,
        order: [[sort, order]],
        include: Activity
      })
      res.json(countries)
    } 
    else if (page < 1) {
      const countries = await Country.findAll({
        limit: 9,
        offset: page,
        include: Activity
      })
      res.json(countries)
    } else if (page > 9 && page < 249) {
      const countries = await Country.findAll({
        limit: 10,
        offset: page,
        include: Activity
      })
      res.json(countries)
    } 
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const country = await Country.findOne({
      where: {
        id: req.params.id
      },
      include: Activity
    });
    if (country) {
      res.status(200).json(country)
    }
    else res.status(400).send('ID does not match')
  } catch (err) {
    next(err)
  }
});

router.get("/search/:name", async (req, res, next) => {
  const nameSearch = req.params.name
  try {
    const countryByName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${nameSearch}%`
        }
      },
      limit: 10,
      order: [["name", "ASC"]],
      include: Activity
    })
    res.send(countryByName);
  } catch (error) {
    next(error)
  }
})


module.exports = router;


// const countryByName = await allCountries.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
