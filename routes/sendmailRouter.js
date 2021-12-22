const Router = require('express')
const router = new Router()
const SendmailController = require('../controllers/sendmailController')

router.post('/', SendmailController.send)

module.exports = router