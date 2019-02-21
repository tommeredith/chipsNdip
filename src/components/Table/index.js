import React, { useState } from 'react'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal } from '../../actions/shuffleAndDeal'
import { deleteTable } from '../../actions/deleteTable'
import { claimSeat } from '../../actions/claimSeat'
import { subscribeToTimer } from '../../socket/timer'

const lifecycleMethods = {
    componentWillMount({ match, grabSingleTable }){
        grabSingleTable(match.params.tableId)
    }
}

const renderUsers = (users, authedUser, table, claimSeat) => {
    if (!users) {
        return
    }
    console.log(authedUser.associatedTables)
    console.log(table._id)
    return users.map((user, index) => {
        const availableSeat = user.isFake && !authedUser.associatedTables.includes(table._id)
        return (
            <div>
                <p>{user.username}</p>
                {availableSeat && (
                    <button onClick={() => claimSeat(users, table._id, authedUser, index)}>claim seat</button>
                )}
            </div>
        )
    })
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable, authedUser, claimSeat }) => {
    const [trashTalkMessage, setTrashTalkMessage] = useState('')
    // const [timestamp, setTimestamp] = useState(null)

    // console.log(timestamp)

    // subscribeToTimer((err, timestamp) => {
    //     setTimestamp(timestamp)
    // })

    const { _id, deck, users, seats } = singleTable

    return (
        <section>
            <h2>Table: {singleTable.title}</h2>

            <button onClick={() => shuffleAndDeal(_id, deck)}>shuffle and deal</button>

            {renderUsers(users, authedUser, singleTable, claimSeat)}

            <button onClick={() => deleteTable(_id)}>delete table</button>

            <h2>Talk that shit, ya queers</h2>


            <input type="text" onChange={(e) => setTrashTalkMessage(e.target.value)} />
            <button>Spout your shit</button>
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