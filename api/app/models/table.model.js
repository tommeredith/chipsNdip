const mongoose = require('mongoose')


const TableSchema = mongoose.Schema({
    title: String,
    seats: Number,
    deck: [{
        suit: String,
        rank: String    
    }],
    users: [
        {
            email: String,
            password: String,
            _id: String
        }
    ]
}, {
    timestamps: true
})

const Table = mongoose.model('Table', TableSchema)

module.exports = {
    Table
}