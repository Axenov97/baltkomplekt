const uuid = require('uuid')
const path = require('path');
const {News} = require('../models/models')
const ApiError = require('../error/ApiError');

class NewsController {
    async create(req, res, next) {
        try {
            let {title, description, description_2, description_3, keywords} = req.body
            // const {img} = req.files
            // let fileName = uuid.v4() + ".jpg"
            // img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const news = await News.create({title, description, description_2, description_3, keywords});
            return res.json(news)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNews(req, res, next) {
        try {
            let {title, description} = req.body
            let {id} = req.params
            if (!id ){
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }
            const news = await News.findOne({where: {id}})
            news.title = title
            news.description = description
            await news.save()
            return res.json(news)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async removeNews(req, res, next) {
        try {
            let {id} = req.params
            if (!id ){
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }
            const news = await News.destroy({where: {id}})
            return res.json(news)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let news = await News.findAndCountAll({limit, offset, order: [['id', 'DESC']]})

        return res.json(news)
    }

    async getOne(req, res) {
        const {id} = req.params
        const news = await News.findOne(
            {
                where: {id}
            },
        )
        return res.json(news)
    }
}

module.exports = new NewsController()