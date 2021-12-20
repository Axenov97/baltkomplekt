const {Faq} = require('../models/models')
const ApiError = require('../error/ApiError');

class FaqController {
    async create(req, res, next) {
        try {
            let {question, answer} = req.body
            const faq = await Faq.create({question, answer});
            return res.json(faq)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeFAQ(req, res, next) {
        try {
            let {question, answer} = req.body
            let {id} = req.params
            if (!id ){
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }
            const faq = await Faq.findOne({where: {id}})
            faq.question = question
            faq.answer = answer
            await faq.save()
            return res.json(faq)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeFAQ(req, res, next) {
        try {
            let {id} = req.params
            if (!id ){
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }
            const faq = await Faq.destroy({where: {id}})
            // await faq.save()
            return res.json(faq)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let faq = await Faq.findAll()
        return res.json(faq)
    }

    async getOne(req, res) {
        const {id} = req.params
        const faq = await Faq.findOne({where: {id}})
        return res.json(faq)
    }
}

module.exports = new FaqController()