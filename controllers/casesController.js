const {Cases} = require('../models/models')
const ApiError = require('../error/ApiError');

class CasesController {
    async createCase(req, res, next) {
        try {
            let {title, description, meta_title, meta_description, meta_keywords, meta_link} = req.body
            const cases = await Cases.create({title, description, meta_title, meta_description, meta_keywords, meta_link});
            return res.json(cases)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeCase(req, res, next) {
        try {
            let {title, description} = req.body
            let {id} = req.params
            if (!id ){
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }
            const cases = await Cases.findOne({where: {id}})
            cases.title = title
            cases.description = description
            await cases.save()
            return res.json(cases)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeCase(req, res, next) {
        try {
            let {id} = req.params
            if (!id ){
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }
            const cases = await Cases.destroy({where: {id}})
            return res.json(cases)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let cases = await Cases.findAll()
        return res.json(cases)
    }

    async getOne(req, res) {
        const {id} = req.params
        const cases = await Cases.findOne(
            {
                where: {id}
            },
        )
        return res.json(cases)
    }
}

module.exports = new CasesController()