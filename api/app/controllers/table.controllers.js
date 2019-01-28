const Table = require('../models/table.model.js')

// create and save new table
const create = (req, res) => {

    // validate
    if ( !req.body.deck ) {
        return res.status(400).send({
            message: "table deck can't be empty"
        })
    }

    // create a table
    const table = new Table({
        title: req.body.title || "you aint name this table",
        deck: req.body.deck
    })

    table.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some shit went down creating the table"
            })
        })
}

// grab and return all tables
const findAll = (req, res) => {
    Table.find()
        .then(tables => {
            res.send(tables)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some shit wen down grabbing all tables"
            })
        })
}

// grab a single table with tableId
const findOne = (req, res) => {
    Table.findById(req.params.tableId)
        .then(table => {
            if ( !table ) {
                return res.status(404).send({
                    message: "couldnt find table with id: " + req.params.tableId
                })
            }
            res.send(table)
        })
        .catch(err => {
            if( err.kind == 'ObjectId' ) {
                return res.status(404).send({
                    message: "couldnt find table with id: " + req.params.tableId
                })
            }

            return res.status(500).send({
                message: "fucked up retrieving table with id: " + req.params.tableId
            })
        })
}

// update a table based on the tableId
const update = (req, res) => {
    if ( !req.body.deck ) {
        return res.status(400).send({
            message: "table deck cannot be empty"
        })
    }

    Table.findByIdAndUpdate(req.params.tableId, {
        title: req.body.title || "you aint name this table AGAIN",
        deck: req.body.deck
    }, {
        new: true
    })
        .then(table => {
            if ( !table ) {
                return res.status(404).send({
                    message: "couldnt find table with id: " + req.params.tableId
                })
            }
            res.send(table)
        })
        .catch(err => {
            if( err.kind == 'ObjectId' ) {
                return res.status(404).send({
                    message: "couldnt find table with id: " + req.params.tableId
                })
            }

            return res.status(500).send({
                message: "fucked up updating table with id: " + req.params.tableId + ": "
            })
        })
    
}

// delete table based on tableId
const deleteTable = (req, res) => {
    Table.findByIdAndDelete(req.params.tableId)
        .then(table => {
            if(!table) {
                return res.status(404).send({
                    message: "couldnt find table with id: " + req.params.tableId
                })
            }

            res.send({ message: "nice, got rid of that table" })
        })
        .catch(err => {
            if ( err.kind == 'ObjectId' || err.name == "NotFound" ) {
                return res.status(404).send({
                    message: "couldnt find table with id: " + req.params.tableId
                })
            }

            return res.status(500).send({
                message: "fucked up deleting table with id: " + req.params.tableId
            })
        })
}

module.exports = {
    create,
    deleteTable,
    update,
    findOne,
    findAll
}