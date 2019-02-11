const User = require('../models/user.model.js')

const create = (req, res) => {
    // validate

    if ( !req.body.email ) {
        return res.status(400).send({
            message: "user email can't be empty"
        })
    }

    if ( !req.body.password ) {
        return res.status(400).send({
            message: "user password can't be empty"
        })
    }

    // create a table
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some shit went down creating the user"
            })
        })
}

// grab a single table with tableId
const findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if ( !user ) {
                return res.status(404).send({
                    message: "couldnt find user with id: " + req.params.userId
                })
            }
            res.send(user)
        })
        .catch(err => {
            if( err.kind == 'ObjectId' ) {
                return res.status(404).send({
                    message: "couldnt find user with id: " + req.params.userId
                })
            }

            return res.status(500).send({
                message: err.message || "fucked up retrieving user with id: " + req.params.userId
            })
        })
}

const findAll = (req, res) => {

    User.find()
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "fucked up retrieving user with id: " + req.params.userId
            })
        })
}

const login = (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {

        if (!user) {
            return res.status(400).send({
                message: "couldnt find user with that email"
            })
        }

        if ( user.password == req.body.password ) {
            res.send(user)
        } else {
            res.status(404).send({
                message: "password aint right"
            })
        }
    })
    .catch(err => {
        res.status(404).send({
            message: "problem finding user with that email: " + err.message
        })
    })
}

const update = (req, res) => {
    // validate

    if ( !req.body.email ) {
        return res.status(400).send({
            message: "user email can't be empty"
        })
    }

    User.findByIdAndUpdate(req.params.userId, {
        email: req.body.email,
        password: req.body.password
    }, {
        new: true
    })
    .then(user => {
        if ( !user ) {
            return res.status(404).send({
                message: "couldnt find user with id: " + req.params.userId
            })
        }
        res.send(user)
    })
    .catch(err => {
        if( err.kind == 'ObjectId' ) {
            return res.status(404).send({
                message: "couldnt find user with id: " + req.params.userId
            })
        }

        return res.status(500).send({
            message: err.message || "fucked up updating user with id: " + req.params.userId
        })
    })

}

const updateHand = (req, res) => {
    // validate
    if ( !req.body.hand ) {
        return res.status(400).send({
            message: "user hand can't be empty"
        })
    }

    User.findByIdAndUpdate(req.params.userId, {
       hand: req.body.hand
    }, {
        new: true
    })
    .then(user => {
        if ( !user ) {
            return res.status(404).send({
                message: "couldnt find user with id: " + req.params.userId
            })
        }
        res.send(user)
    })
    .catch(err => {
        if( err.kind == 'ObjectId' ) {
            return res.status(404).send({
                message: "couldnt find user with id: " + req.params.userId
            })
        }

        return res.status(500).send({
            message: err.message || "fucked up updating user with id: " + req.params.userId
        })
    })

}

module.exports = {
    create,
    findOne,
    update,
    updateHand,
    findAll,
    login
}