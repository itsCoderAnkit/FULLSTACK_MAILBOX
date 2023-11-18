const express = require('express')
const router = express.Router()

const userAuthentication = require('../middleware/auth')
const mailController = require('../Controllers/mailController')

router.post('/send-mail',userAuthentication.authenticate,mailController.sentMail)

module.exports = router