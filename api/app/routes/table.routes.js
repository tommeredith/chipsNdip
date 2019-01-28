module.exports = app => {
    const tables = require('../controllers/table.controllers.js')

    // creates a new table
    app.post('/tables', tables.create)

    // get all tables
    app.get('/tables', tables.findAll)

    // get a single table with tableId
    app.get('/tables/:tableId', tables.findOne)

    // update a table with tableId
    app.put('/tables/:tableId', tables.update)

    // delete a table with tableId
    app.delete('/tables/:tableId', tables.deleteTable)
}