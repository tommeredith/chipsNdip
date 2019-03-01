module.exports = app => {
    const tables = require('../controllers/table.controllers.js')

    // creates a new table
    app.post('/tables', tables.create)

    // get all tables
    app.get('/tables', tables.findAll)

    // get a single table with tableId
    app.get('/tables/:tableId', tables.findOne)

    // update a deck for a table with tableId
    app.put('/tables/:tableId/deck', tables.updateTableDeck)

    // update users for a table with tableId
    app.put('/tables/:tableId/users', tables.updateTableUsers)

    // delete a table with tableId
    app.delete('/tables/:tableId', tables.deleteTable)

    // update table chat
    app.put('/tables/:tableId/chat', tables.updateTableChat)

    // delete table chat
    app.put('/tables/:tableId/chat/delete', tables.deleteTableChat)
}