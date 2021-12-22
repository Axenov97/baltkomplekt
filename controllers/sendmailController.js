const ApiError = require('../error/ApiError');
require('dotenv').config()
const mailer = require("nodemailer")

class SendmailController {
    async send(req, res, next) {
        try{
            // let { text } = req.body
            const transporter = mailer.createTransport({
                service: "Yandex",
                auth: {
                    user: 'web.baltkomlekt@yandex.ru',
                    pass: 'sxqfzyfyogleerdt'
                }
            })

            const mailOptions = {
                from: 'web.baltkomlekt@yandex.ru', //отправитель
                to: "dimka180497@mail.ru, web.baltkomlekt@yandex.ru", //получатели
                subject: "Заявка с сайта", //заголовок
               text: 'test'
            }
            await transporter.sendMail(mailOptions)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new SendmailController()