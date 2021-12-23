const ApiError = require('../error/ApiError');
require('dotenv').config()
const mailer = require("nodemailer")

class SendmailController {
    async send(req, res, next) {
        try{
            let { name, email, phone, text } = req.body
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
                // text: text
                html: `<div style="border:1px solid black;padding:20px;
                            font-family:sans-serif;line-height:2;font-size:20px; ">
                            <p>Имя: ${name}</p>
                            <p>Email: ${email}</p>
                            <p>Телефон: ${phone}</p>
                            <p>Запрос: ${text}</p>
                        </div>`
            }
            await transporter.sendMail(mailOptions)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new SendmailController()