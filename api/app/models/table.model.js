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
            username: String,
            password: String,
            isFake: {type: Boolean, default: false},
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