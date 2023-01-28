const ApiError = require('../error/ApiError');
require('dotenv').config()
const mailer = require("nodemailer")

class SendmailController {
    async send(req, res, next) {
        try{
            let { name, email, phone, text, button } = req.body
            const transporter = mailer.createTransport({
                service: "Yandex",
                auth: {
                    user:  process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.EMAIL, //отправитель
                to: process.env.EMAIL,  //получатели
                subject: "Заявка с сайта", //заголовок
                // text: text
                html: `<div style="padding:5px; font-family:sans-serif; line-height:2; font-size:16px;">
                            <h1 style="font-size: 20px;font-weight: bold;">
                                Заявка по кнопке ${button}
                            </h1>
                            <p>Имя: ${name}</p>
                            <p>Email: ${email}</p>
                            <p>Телефон: ${phone}</p>
                            <p>Запрос: ${text}</p>
                        </div>`
            }
            await transporter.sendMail(mailOptions)
            return res.json(transporter)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new SendmailController()