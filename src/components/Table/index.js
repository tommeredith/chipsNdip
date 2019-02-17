import React from 'react'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal } from '../../actions/shuffleAndDeal'
import { deleteTable } from '../../actions/deleteTable';

const lifecycleMethods = {
    componentWillMount({ match, grabSingleTable }){
        grabSingleTable(match.params.tableId)
    }
}

const renderUsers = (users, authedUser) => {
    if (!users) {
        return
    }

    console.log('authedUser', authedUser)
    return users.map(user => {
        console.log(user)
        const availableSeat = user.isFake && user._id === authedUser._id
        return (
            <div>
                <p>{user.email}</p>
                {availableSeat && (
                    <button>claim seat</button>
                )}
            </div>
        )
    })
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable, authedUser }) => {
    const { _id, deck, users, seats } = singleTable

    return (
        <section>
            <h2>Table: {singleTable.title}</h2>

            <button onClick={() => shuffleAndDeal(_id, deck)}>shuffle and deal</button>

            {renderUsers(users, authedUser)}

            <button onClick={() => deleteTable(_id)}>delete table</button>
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    grabSingleTable: tableId => dispatch(fetchTableById(tableId)),
    shuffleAndDeal: (tableId, deck) => dispatch(shuffleAndDeal(tableId, deck)),
    deleteTable: tableId => dispatch(deleteTable(tableId))
})

const mapStateToProps = state => ({
    singleTable: state.singleTable.table,
    authedUser: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(Table))