const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')

router.post('/', newsController.create)
router.post('/:id', newsController.changeNews)
router.post('/remove/:id', newsController.removeNews)
router.get('/', newsController.getAll)
router.get('/:id', newsController.getOne)

module.exports = router