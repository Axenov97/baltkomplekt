const Router = require('express')
const router = new Router()
const casesController = require('../controllers/casesController')

router.post('/', casesController.createCase)
router.post('/:id', casesController.changeCase)
router.post('/remove/:id', casesController.removeCase)
router.get('/', casesController.getAll)
router.get('/:id', casesController.getOne)

module.exports = router