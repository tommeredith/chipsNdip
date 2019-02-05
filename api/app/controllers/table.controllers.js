const TableModel = require('../models/table.model.js')

const Table = TableModel.Table
const UserInTable = TableModel.UserInTable

// create and save new table
const create = (req, res) => {
    
    // validate
    if ( !req.body.deck ) {
        return res.status(400).send({
            message: "table deck can't be empty"
        })
    }

    if ( req.body.users.length == 0 ) {
        return res.status(400).send({
            message: "need starting users"
        })
    }

    if ( !req.body.title ) {
        return res.status(400).send({
            message: "table title can't be empty"
        })
    }

    // const modeledUsers = []
    
    // req.body.users.map(user => {

    //     const modeledUser = new UserInTable({
    //         name: user.name,
    //         userId: user.userId
    //     })

    //     modeledUsers.push(modeledUser)
    // })

    // console.log('modeledUsers', modeledUsers)

    // create a table
    const table = new Table({
        title: req.body.title || "you aint name this table",
        deck: req.body.deck,
        users: req.body.users
    })

    table.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "some shit went down saving the table: " + err.message 
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
                message: "some shit went down grabbing all tables: " + err.message
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