const { Country, Activity } = require('../db')
const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize')

router.get("/", async (req, res, next) => {
  try {
    let totalData = await Country.findAll({
      include: [{
        model: Activity,
        through: {
          attributes: []
        }
      }]
    })
    res.send(totalData)
  } catch (error) {
    next(error)
  }
})

router.get("/filter", async (req, res, next) => {
  try {
    const { page, sort, order, limit, continent, name, language } = req.query;
    let condition = {};
    let where = {};
    if (name && name.length > 2) {
      where.name = {[Op.iLike]: `${name}%`}
    }
    if (continent) {
      where.continent = continent
    }
    condition.where = where;
    limit ? condition.limit = limit : !condition.limit;
    page ? condition.offset = page : !condition.offset;
    sort && order ? condition.order = [[sort, order]] : !condition.order;
    let countries = await Country.findAll(condition)
    res.send(countries)
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