const Router = require('express')
const router = new Router()
const materialsController = require('../controllers/materialsController')

router.post('/', materialsController.create)
router.post('/:id', materialsController.changeMaterials)
router.post('/remove/:id', materialsController.removeMaterials)
router.get('/', materialsController.getAll)
router.get('/:id', materialsController.getOne)

module.exports = router