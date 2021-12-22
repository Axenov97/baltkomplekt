const ApiError = require('../error/ApiError');
require('dotenv').config()
const mailer = require('nodemailer')
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
class sendmailController {
    async send(req, res, next) {
        try{
            let { text } = req.body
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