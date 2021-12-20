const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async changePassword (req, res, next) {
        const {login, password} = req.body
        if (!login || !password){
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.badRequest('Пользователя с таким login не существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        user.password = hashPassword
        await user.save()
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }

    // async registration(req, res, next) {
    //     const {login, password, role} = req.body
    //     if (!login || !password){
    //         return next(ApiError.badRequest('Некорректный email или пароль'))
    //     }
    //     const candidate = await User.findOne({where: {login}})
    //     if (candidate) {
    //         return next(ApiError.badRequest('Пользователь с такими login уже существует'))
    //     }
    //     const hashPassword = await bcrypt.hash(password, 5)
    //     const user = await User.create({login, role, password: hashPassword})
    //     const token = generateJwt(user.id, user.login, user.role)
    //     return res.json({token})
    // }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }


    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()