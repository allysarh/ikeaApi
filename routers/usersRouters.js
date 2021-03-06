// router: mengarahkan request dari user atau FE ke controller yang kita tuju
const express = require('express')
const { readToken } = require('../config')
const { usersControllers, productsController } = require('../controllers')
const router = express.Router()

router.get('/get-all', usersControllers.getUsers)
router.post('/login', usersControllers.login)
router.post('/register', usersControllers.register)
router.post('/keep', readToken, usersControllers.keepLogin)
router.post('/verifyOTP', readToken, usersControllers.verifyOtp)
router.post('/verif-ulang', usersControllers.reVerif)
module.exports = router