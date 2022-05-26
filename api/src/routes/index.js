const { Router } = require('express');
const c_controller = require('../controllers/country-controller');
const a_controller = require('../controllers/activity-controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", c_controller);
router.use("/activity", a_controller);


module.exports = router;
