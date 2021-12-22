const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const faqRouter = require('./faqRouter')
const casesRouter = require('./casesRouter')
const materialsRouter = require('./materialsRouter')
const newsRouter = require('./newsRouter')
// const sendmailRouter = require('./sendmailRouter')

router.use('/user', userRouter)
router.use('/news', newsRouter)
router.use('/faq', faqRouter)
router.use('/case', casesRouter)
router.use('/materials', materialsRouter)
// router.use('/sendmail', sendmailRouter)


module.exports = router