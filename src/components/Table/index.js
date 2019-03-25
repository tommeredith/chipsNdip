import React, { useState } from 'react'
import _ from 'underscore'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal, shuffleDeck } from '../../actions/shuffleAndDeal'
import { buildDeck } from '../../actions/createTable'
import { resetDeck } from '../../actions/resetDeck'
import { deleteTable } from '../../actions/deleteTable'
import { claimSeat } from '../../actions/claimSeat'
import { talkShitEmit, talkShitSubscribe } from '../../socket/shitTalk'
import { dealHandEmit, dealHandSubscribe } from '../../socket/dealHand'
import { resetDeckEmit, resetDeckSubscribe } from '../../socket/resetDeck'
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

const renderHand = hand => {
   if ( !hand ) {
       return
   }

    return (
        <p>
            {hand.map(card => (
                <span>{card.rank} of {card.suit}</span>
            ))}
        </p>
    )
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable, authedUser, claimSeat, updateTableChat, resetDeck }) => {

    if ( _.isEmpty(singleTable) ) {
        return <div></div>
    }

    const [shitTalkMessages, setShitTalkMessages] = useState([])
    const [indivShitTalkMessage, setIndivShitTalkMessage] = useState('')
    const [tableUsers, setTableUsers] = useState(singleTable.users)
    const [tableDeck, setTableDeck] = useState(singleTable.deck)
    
    const { _id, seats } = singleTable
    const users = tableUsers
    const deck = tableDeck

    resetDeckSubscribe((users, deck) => {
        setTableUsers(users)
        setTableDeck(deck)
    })

    const resetDeckEmission = (_id, users) => {
        const deck = buildDeck()
        users.map(user => user.hand = [])

        resetDeck(_id, users, deck)
        resetDeckEmit(users, deck)
    }

    dealHandSubscribe((users, deck) => {
        setTableUsers(users)
        setTableDeck(deck)
    })

    const shuffleAndDealEmission = (_id, users, deck) => {
        let shuffledDeck = shuffleDeck(deck)

        const newUsers = users.map(user => {
            if (!user.isFake) {
                const newHand = shuffledDeck.splice(0,2)
                user['hand'] = newHand
                
                return user
            }
        })

        shuffleAndDeal(_id, newUsers, shuffledDeck)

        dealHandEmit(newUsers, shuffledDeck)
    }

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

    
    
    const userAtTable = users && users.find(user => {
        return user._id == authedUser._id
    })

    return (
        <section>
            <h2>Table: {singleTable.title}</h2>
            <h4>Player: {authedUser.username}</h4>
            <h5>Current Hand:</h5>
            {userAtTable && renderHand(userAtTable.hand)}
            <button onClick={() => shuffleAndDealEmission(_id, users, deck)}>shuffle and deal</button>
            <button onClick={() => resetDeckEmission(_id, users)}>reset deck</button>
            {renderUsers(users, authedUser, singleTable, claimSeat)}
           
            <h2>Talk that shit, ya queers</h2>
            
            {renderShitTalk(singleTable.shitTalkMessages, shitTalkMessages) }

            <input type="text" onChange={(e) => setIndivShitTalkMessage(e.target.value)} />
            <button onClick={() => addShitTalkMessage(authedUser.username, indivShitTalkMessage)}>Spout your shit</button>

            <p>Current deck size: {deck.length}</p>
            <button onClick={() => deleteTable(_id)}>delete table</button>

        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    grabSingleTable: tableId => dispatch(fetchTableById(tableId)),
    shuffleAndDeal: (tableId, users, deck) => dispatch(shuffleAndDeal(tableId, users, deck)),
    deleteTable: tableId => dispatch(deleteTable(tableId)),
    claimSeat: (users, tableId, authedUser, seatIndex) => dispatch(claimSeat(users, tableId, authedUser, seatIndex)),
    updateTableChat: (tableId, messages) => dispatch(updateTableChat(tableId, messages)),
    resetDeck: (tableId, users, deck) => dispatch(resetDeck(tableId, users, deck))
})

const mapStateToProps = state => ({
    singleTable: state.singleTable.table,
    authedUser: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(Table))