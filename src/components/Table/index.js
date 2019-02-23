import React, { useState } from 'react'
import _ from 'underscore'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal } from '../../actions/shuffleAndDeal'
import { deleteTable } from '../../actions/deleteTable'
import { claimSeat } from '../../actions/claimSeat'
import { subscribeToTimer } from '../../socket/timer'
import { talkShitEmit, talkShitSubscribe } from '../../socket/shitTalk'

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
                <p>{user.username}</p>
                {availableSeat && (
                    <button onClick={() => claimSeat(users, table._id, authedUser, index)}>claim seat</button>
                )}
            </div>
        )
    })
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable, authedUser, claimSeat }) => {
    const [shitTalkMessages, setShitTalkMessages] = useState([])
    const [indivShitTalkMessage, setIndivShitTalkMessage] = useState('')
    // const [timestamp, setTimestamp] = useState(null)

    // console.log(timestamp)

    // subscribeToTimer((err, timestamp) => {
    //     setTimestamp(timestamp)
    // })

    talkShitSubscribe((talkShitMessage) => {
        setShitTalkMessages([
            ...shitTalkMessages,
            {
                username: talkShitMessage.username,
                message: talkShitMessage.message
            }
        ])
    })

    const addShitTalkMessage = (username, message) => {
        setShitTalkMessages([
            ...shitTalkMessages,
            {
                username,
                message
            }
        ])
        talkShitEmit(authedUser, message)
    }

    const { _id, deck, users, seats } = singleTable

    return (
        <section>
            <h2>Table: {singleTable.title}</h2>

            <button onClick={() => shuffleAndDeal(_id, deck)}>shuffle and deal</button>

            {renderUsers(users, authedUser, singleTable, claimSeat)}

            <button onClick={() => deleteTable(_id)}>delete table</button>

            <h2>Talk that shit, ya queers</h2>
            
            {!_.isEmpty(shitTalkMessages) && (
                <ul>
                    {shitTalkMessages.map(message => (
                        <li>{message.username}: {message.message}</li>
                    ))}
                </ul>
            )}
            <input type="text" onChange={(e) => setIndivShitTalkMessage(e.target.value)} />
            <button onClick={() => addShitTalkMessage(authedUser.username, indivShitTalkMessage)}>Spout your shit</button>
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