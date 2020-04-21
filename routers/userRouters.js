const express = require('express')
const { userControllers } = require('../controllers')
const router = express.Router()
const { auth } = require('../helper/Auth')


router.get('/allusers', userControllers.allusers)
router.get('/users', userControllers.users)
router.post('/users', userControllers.addnewuser)
router.put('/users/:id', userControllers.edituser)
router.delete('/users/:id', userControllers.deleteuser)
router.post('/register', userControllers.registeruser)
router.get('/keeplogin/:idusers', userControllers.keeplogin)
router.put('/verified', userControllers.verifieduser)
router.get('/login', userControllers.userlogin)
router.get('/createtoken', userControllers.generatetoken)
router.get('/tokenberubah', auth, userControllers.tokenberubah)


module.exports = router
