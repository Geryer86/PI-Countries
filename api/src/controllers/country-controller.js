const { Country, Activity } = require('../db')
const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize')


router.get('/', async (req, res, next) => {
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
        //order: [[sort, order]],
        include: Activity
      })
      res.json(countries)
    }
    if (name && name.length > 1) {
      const countries = await Country.findAll({
        where: {
          name: { [Op.iLike]: `${name}%` },
        },
        limit: 10,
        offset: page,
        //order: [[sort, order]],
        include: Activity
      })
      res.json(countries)
    }
    if (continent) {
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
    } else if (sort && order) {
      const countries = await Country.findAll({
        where: {
          name: { [Op.iLike]: `${name}%` },
        },
        limit: 10,
        offset: page,
        order: [[sort, order]],
        include: Activity
      })
      res.json(countries)
    } else if (page < 1) {
      const countries = await Country.findAll({
        limit: 9,
        offset: page,
        include: Activity
      })
      res.json(countries)
    } else if (page > 0 && page < 249) {
      const countries = await Country.findAll({
        limit: 10,
        offset: page,
        include: Activity
      })
      res.json(countries)
    } else {
      const countries = await Country.findAll({
        offset: page,
        include: Activity
      })
      res.json(countries)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
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

module.exports = router;


//const idCountry = req.params.id;
//const idCountryM = idCountry.toUpperCase()

// router.get('/', async (req, res, next) => {
//   const { page, orderBy, order, continent } = req.query;
//   try {
//     if (continent) {
//       if (orderByAlp) {
//         const countriesContA = await Country.findAll({
//           where: {
//             continent: continent
//           },
//           limit: 10,
//           offset: page,
//           order: [["name", orderByAlp]],
//           include: Activity
//         })
//         res.json(countriesContA)
//       } else if (orderByPop) {
//         const countriesContP = await Country.findAll({
//           where: {
//             continent: continent
//           },
//           limit: 10,
//           offset: page,
//           order: [["population", orderByPop]],
//           include: Activity
//         })
//         res.json(countriesContP)
//       }
//     } else if (orderByAlp) {
//       const countriesAlp = await Country.findAll({
//         limit: 10,
//         offset: page,
//         order: [["name", orderByAlp]],
//         include: Activity
//       })
//       res.json(countriesAlp)
//     } else if (orderByPop) {
//       const countriesPop = await Country.findAll({
//         limit: 10,
//         offset: page,
//         order: [["population", orderByPop]],
//         include: Activity
//       })
//       res.json(countriesPop)
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// if (activities) {
//   const countriesAct = await Country.findAll({
//     where: {
//       Activity: activities
//     },
//     limit: 10,
//     offset: page,
//     order: [[orderBy, order]],
//   })
//   res.json(countriesAct)
// }

// router.get("/search/:name", async (req, res, next) => {
//   const nameSearch = req.params.name
//   try {
//     const countryByName = await Country.findAll({       // const countryByName = await allCountries.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()));
//       where: {
//         name: {
//           [Op.iLike]: `%${nameSearch}%`
//         }
//       },
//       limit: 10,
//       order: [["name", "ASC"]],
//       include: Activity
//     })
//     res.send(countryByName);
//   } catch (error) {
//     next(error)
//   }
// })
