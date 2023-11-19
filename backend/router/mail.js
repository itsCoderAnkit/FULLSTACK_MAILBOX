const express = require('express')
const router = express.Router()

const userAuthentication = require('../middleware/auth')
const mailController = require('../Controllers/mailController')

router.post('/send-mail',userAuthentication.authenticate,mailController.sentMail)
router.get('/getInboxMails',userAuthentication.authenticate,mailController.getAllInbox)
router.get('/getSentMails',userAuthentication.authenticate,mailController.getSentMails)
router.delete('/deleteInboxMails/:id',mailController.deleteInboxMail)

module.exports = router