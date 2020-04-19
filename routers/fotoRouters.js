const express = require('express')
const { fotoControllers } = require('../controllers')

const router = express.Router()

router.get('/foto', fotoControllers.getfoto)
router.post('/foto', fotoControllers.postfoto)

module.exports = router