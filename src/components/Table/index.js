import React, { useState } from 'react'
import _ from 'underscore'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal } from '../../actions/shuffleAndDeal'
import { deleteTable } from '../../actions/deleteTable'
import { claimSeat } from '../../actions/claimSeat'
import { talkShitEmit, talkShitSubscribe } from '../../socket/shitTalk'
import { updateTableChat } from '../../actions/updateTableChat'

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

const renderShitTalk = (messages, localMessages) => {
    const allShitTalkMessages = messages.concat(localMessages)
    return (
        <ul>
            {allShitTalkMessages.map(message => (
                <li>{message.username}: {message.message}</li>
            ))}
        </ul>
    )
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable, authedUser, claimSeat, updateTableChat }) => {

    const [shitTalkMessages, setShitTalkMessages] = useState([])
    const [indivShitTalkMessage, setIndivShitTalkMessage] = useState('')

    talkShitSubscribe((talkShitMessage) => {
        const gotClappedAt = !_.isEmpty(authedUser) && talkShitMessage.username !== authedUser.username

        if ( gotClappedAt ) {
            const updatedShitTalkMessages = shitTalkMessages.concat({
                username: talkShitMessage.username,
                message: talkShitMessage.message
            })
            
            setShitTalkMessages(updatedShitTalkMessages)
        }
    })

    const addShitTalkMessage = (username, message) => {

        const updatedShitTalkMessages = shitTalkMessages
            .concat({
                username,
                message
            })
        
        setShitTalkMessages(updatedShitTalkMessages)
        talkShitEmit(authedUser, message)

        updateTableChat(singleTable._id, singleTable.shitTalkMessages.concat(updatedShitTalkMessages))
    }

    const { _id, deck, users, seats } = singleTable

    return (
        <section>
            <h2>Table: {singleTable.title}</h2>
            <h4>Player: {authedUser.username}</h4>
            <button onClick={() => shuffleAndDeal(_id, deck)}>shuffle and deal</button>

            {renderUsers(users, authedUser, singleTable, claimSeat)}

            <button onClick={() => deleteTable(_id)}>delete table</button>

            <h2>Talk that shit, ya queers</h2>
            
            {!_.isEmpty(singleTable.shitTalkMessages) && renderShitTalk(singleTable.shitTalkMessages, shitTalkMessages) }

            <input type="text" onChange={(e) => setIndivShitTalkMessage(e.target.value)} />
            <button onClick={() => addShitTalkMessage(authedUser.username, indivShitTalkMessage)}>Spout your shit</button>
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    grabSingleTable: tableId => dispatch(fetchTableById(tableId)),
    shuffleAndDeal: (tableId, deck) => dispatch(shuffleAndDeal(tableId, deck)),
    deleteTable: tableId => dispatch(deleteTable(tableId)),
    claimSeat: (users, tableId, authedUser, seatIndex) => dispatch(claimSeat(users, tableId, authedUser, seatIndex)),
    updateTableChat: (tableId, messages) => dispatch(updateTableChat(tableId, messages))
})

const mapStateToProps = state => ({
    singleTable: state.singleTable.table,
    authedUser: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(Table))