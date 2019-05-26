import React, { useState } from 'react'
import TableLayout from './TableLayout'
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
import { dealSharedCards } from '../../actions/dealSharedCards'

const lifecycleMethods = {
    componentWillMount({ match, grabSingleTable }){
        grabSingleTable(match.params.tableId)
    }
}

const renderShitTalk = (messages, localMessages) => {
    const allShitTalkMessages = messages.concat(localMessages)
    return (
        <ul>
            {allShitTalkMessages.map((message, index) => (
                <li key={index}>{message.username}: {message.message}</li>
            ))}
        </ul>
    )
}

const renderSharedCardButton = (table, deck, dealSharedCards) => {
    if ( !table || (table.flopShown & table.turnShown & table.riverShown) ) {
        return
    }

    let buttonText = '',
        buttonStage = ''
        
    if ( !table.flopShown ) {
        buttonText = 'hit me with that flop, pimpin',
        buttonStage = 'flopShown'

    }
    if ( table.flopShown & !table.turnShown ) {
        buttonText = 'how about we try that turn'
        buttonStage = 'turnShown'
    }

    if ( table.flopShown & table.turnShown & !table.riverShown ) {
        buttonText = 'now gimme that sweet sweet river'
        buttonStage = 'riverShown'
    }

    return(
        <button onClick={() => dealSharedCards(table, deck, buttonStage)}>{buttonText}</button>
    )
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable, authedUser, claimSeat, updateTableChat, resetDeck, dealSharedCards }) => {

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

    let isUserAllowedToFuckAround = false,
        tableIsFull = tableUsers.filter(user => user.isFake).length == 0,
        tableIsReady = tableUsers.filter(user => user.isReady).length == tableUsers.length,
        waitingForOtherUsersToBeReady = !tableIsReady && tableUsers.find(user => user._id === authedUser._id).isReady

    tableUsers.map(user => {
        if (user._id == authedUser._id ) {
            isUserAllowedToFuckAround = true
        }
    })

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

    return (
        <section>
            <h2>Table: {singleTable.title}</h2>
            <h4>Player: {authedUser.username}</h4>

            {(isUserAllowedToFuckAround && tableIsFull && tableIsReady) && (
                <div>
                    {!singleTable.handsBeenDealt ? 
                        <button onClick={() => shuffleAndDealEmission(_id, users, deck)}>shuffle and deal</button> :
                        renderSharedCardButton(singleTable, deck, dealSharedCards)
                    }
                    <button onClick={() => resetDeckEmission(_id, users)}>reset deck</button>
                </div>
            )}

            {
                waitingForOtherUsersToBeReady && (
                    <div>
                        <h5>
                            Waiting for the other players...
                        </h5>
                    </div>
                )
            }
            
            
            <TableLayout table={singleTable} />
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
    resetDeck: (tableId, users, deck) => dispatch(resetDeck(tableId, users, deck)),
    dealSharedCards: (table, deck, sharedCardSection) => dispatch(dealSharedCards(table, deck, sharedCardSection))
})

const mapStateToProps = state => ({
    singleTable: state.singleTable.table,
    authedUser: state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(Table))