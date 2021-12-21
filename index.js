require('dotenv').config()
const express = require('express')

const https = require('https')
// const http = require('http')
const fs = require('fs')
const privateKey  = fs.readFileSync('/etc/letsencrypt/live/vm671464.vps.masterhost.tech/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/vm671464.vps.masterhost.tech/fullchain.pem');
const credentials = {key: privateKey, cert: certificate};

const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        // const httpServer = http.createServer(app);
        const httpsServer = https.createServer(credentials, app);

        // app.listen(PORT, () => {console.log(`Server ${PORT}`)})
        // httpServer.listen(PORT, () =>{console.log(`http : ${PORT}`)});
        httpsServer.listen(PORT, () =>{console.log(`https : ${PORT}`)});

    }
    catch (e) {
        console.log(e)
    }
}

start()