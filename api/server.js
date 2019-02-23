const bodyParser = require('body-parser')
const express = require('express')
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose')
const cors = require('cors')
const io = require('socket.io')()
const _ = require('underscore')

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
const port = 1234
const socketPort = 2345

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

var players = {}

io.on('connection', client => {

    // JUST FOR KEEPING TRACK OF CURRENT SESSIONS
    players[client.id] = true
    io.sockets.emit('connected_players', _.size(players));
    console.log('PLAYERS: ', players)

    client.on('disconnect', () => {
        delete players[client.id]
        console.log('player ' + client.id + ' disconnected')
    })


    // CHAT MESSAGES
    
    client.on('talk_shit', (message) => {
        console.log('message: ', message)

        io.sockets.emit('shit_talked', message)
    })

    // client.on('subscribeToTimer', interval => {
    //     console.log('client is subscribing to timer with interval ', interval)

    //     setInterval(() => {
    //         client.emit('timer', new Date())
    //     }, interval)
    // })
})

io.listen(socketPort)
console.log('socket listening on ' + socketPort)

app.listen(port, () => {
    console.log("i'm hearing you on " + port)
})