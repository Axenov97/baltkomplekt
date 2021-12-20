const uuid = require('uuid')
const path = require('path');
const {Materials} = require('../models/models')
const ApiError = require('../error/ApiError');

class MaterialsController {
    async create(req, res, next) {
        try {
            let {title, description} = req.body
            let {document} = req.files
            let pathIncludeDote = document.name.split('') //разбиваем имя файла в массив посимвольно, чтобы найти точки
            let countDote = 0 //переменная счетчик для количества точек в массиве

            for (let i = 0; i< pathIncludeDote.length; i ++){
                if (pathIncludeDote[i] === '.')
                    countDote++
            }
            if (countDote !== 1){
                return next(ApiError.badRequest('Ошибка в расширении файла')) //ошибка если имя файла содержит более или менее одной точки
            }

            let extension = document.name.split('.').pop()
            let documentName = uuid.v4() + extension.padStart(extension.length + 1, '.')
            await document.mv(path.resolve(__dirname, '..', 'static', documentName))
            const material = await Materials.create({ title, description, document: documentName});
            return res.json(material)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeMaterials(req, res, next) {
        try {
            let {title, description} = req.body
            let {id} = req.params
            if (!id) {
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }

            const material = await Materials.findOne({where: {id}})

            if (req.files) {
                let {document} = req.files
                let pathIncludeDote = document.name.split('')
                let countDote = 0
                for (let i = 0; i < pathIncludeDote.length; i++) {
                    if (pathIncludeDote[i] === '.')
                        countDote++
                }
                if (countDote !== 1) {
                    return next(ApiError.badRequest('Ошибка в расширении файла'))
                }
                let extension = document.name.split('.').pop()
                let documentName = uuid.v4() + extension.padStart(extension.length + 1, '.')
                await document.mv(path.resolve(__dirname, '..', 'static', documentName))
                material.document = documentName
            }

            material.title = title
            material.description = description
            await material.save()

            return res.json(material)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async downloadFile(req, res){
        try {
            let {id} = req.params
            const file = await Materials.findOne({where: {id}})
            const path = config.get('filePath')
        } catch (e) {
            res.status(500).json({message: 'Download error'})
        }
    }
    async removeMaterials(req, res, next) {
        try {
            let {id} = req.params
            if (!id ){
                return next(ApiError.badRequest(`Записи с id=${id} не существует`))
            }
            const material = await Materials.destroy({where: {id}})
            return res.json(material)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let materials = await Materials.findAll({order: [['id', 'DESC']]})
        return res.json(materials)
    }

    async getOne(req, res) {
        const {id} = req.params
        const material = await Materials.findOne(
            {
                where: {id}
            },
        )
        return res.json(material)
    }
}

module.exports = new MaterialsController()