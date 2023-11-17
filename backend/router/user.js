const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController.js')


router.post('/user/signup',userController.postUserSignUp)

module.exports = router