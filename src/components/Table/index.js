import React from 'react'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal } from '../../actions/shuffleAndDeal'
import { deleteTable } from '../../actions/deleteTable'
import { claimSeat } from '../../actions/claimSeat'

const lifecycleMethods = {
    componentWillMount({ match, grabSingleTable }){
        grabSingleTable(match.params.tableId)
    }
}

const renderUsers = (users, authedUser, table, claimSeat) => {
    if (!users) {
        return
    }

    return users.map((user, index) => {
        const availableSeat = user.isFake && !authedUser.associatedTables.includes(table._id)
        return (
            <div>
                <p>{user.email}</p>
                {availableSeat && (
                    <button onClick={() => claimSeat(users, table._id, authedUser, index)}>claim seat</button>
                )}
            </div>
        )
    })
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable, authedUser, claimSeat }) => {
    const { _id, deck, users, seats } = singleTable

    return (
        <section>
            <h2>Table: {singleTable.title}</h2>

            <button onClick={() => shuffleAndDeal(_id, deck)}>shuffle and deal</button>

            {renderUsers(users, authedUser, singleTable, claimSeat)}

            <button onClick={() => deleteTable(_id)}>delete table</button>
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    grabSingleTable: tableId => dispatch(fetchTableById(tableId)),
    shuffleAndDeal: (tableId, deck) => dispatch(shuffleAndDeal(tableId, deck)),
    deleteTable: tableId => dispatch(deleteTable(tableId)),
    claimSeat: (users, tableId, authedUser, seatIndex) => dispatch(claimSeat(users, tableId, authedUser, seatIndex))
})

const mapStateToProps = state => ({
    singleTable: state.singleTable.table,
    authedUser: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(Table))