const express = require('express')
const { fotoControllers } = require('../controllers')

const router = express.Router()

router.get('/foto', fotoControllers.getfoto)
router.post('/foto', fotoControllers.postfoto)
router.delete('/foto/:id', fotoControllers.deletefoto)
router.put('/foto/:id', fotoControllers.editfoto)
router.get('/kataenc', fotoControllers.encryptkata)
router.get('/kirimemail', fotoControllers.kirimemail)

module.exports = router