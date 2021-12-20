const Router = require('express')
const router = new Router()
const faqController = require('../controllers/faqController')

router.post('/', faqController.create)
router.post('/:id', faqController.changeFAQ)
router.post('/remove/:id', faqController.removeFAQ)
router.get('/', faqController.getAll)
router.get('/:id', faqController.getOne)

module.exports = router