const mongoose = require('mongoose')

const TableSchema = mongoose.Schema({
    title: String,
    deck: [{
        suit: String,
        rank: String    
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Table', TableSchema)