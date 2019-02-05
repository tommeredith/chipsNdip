const mongoose = require('mongoose')


const TableSchema = mongoose.Schema({
    title: String,
    deck: [{
        suit: String,
        rank: String    
    }],
    users: [{name: String,
        userId: String}]
}, {
    timestamps: true
})

const Table = mongoose.model('Table', TableSchema)

module.exports = {
    Table
}