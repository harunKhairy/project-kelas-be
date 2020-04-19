const express = require('express')
const { userControllers } = require('../controllers')
const router = express.Router()

router.get('/allusers', userControllers.allusers)
router.get('/users', userControllers.users)
router.post('/users', userControllers.addnewuser)
router.put('/users/:id', userControllers.edituser)
router.delete('/users/:id', userControllers.deleteuser)

module.exports = router