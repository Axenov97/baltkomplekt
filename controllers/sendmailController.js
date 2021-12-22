const ApiError = require('../error/ApiError');
require('dotenv').config()
const mailer = require('nodemailer')

class sendmailController {
    async send(req, res, next) {
        try{
            let { text } = req.body
            const transporter = mailer.createTransport({
                service: "Yandex",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            })

            const mailOptions = {
                from: 'web.baltkomlekt@yandex.ru', //отправитель
                to: "dimka180497@mail.ru, web.baltkomlekt@yandex.ru", //получатели
                subject: "Заявка с сайта", //заголовок
                html: `<div style="
                    border: 1px solid black;
                    padding: 20px;
                    font-family: sans-serif;
                    line-height: 2;
                    font-size: 20px; 
                    ">
                    <h2>Here is your email!</h2>
                    <p>${text}</p>
                
                    <p>All the best, Darwin</p>
                     </div>`
            }
            await transporter.sendMail(mailOptions)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new sendmailController()