const bodyParser = require('body-parser')
const express = require('express')
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to db")
}).catch(err => {
    console.log("couldnt connect to db", err)
    process.exit()
})

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "all kinds of shit happening up in here"})
})

// bring in table routes
require('./app/routes/table.routes.js')(app);

// bring in user routes
require('./app/routes/user.routes.js')(app)

app.listen(1234, () => {
    console.log("i'm hearing you on 1234")
})