import _ from 'underscore'
import axios from 'axios'

export const SHUFFLE_DECK = "SHUFFLE_DECK"
export const SEND_SHUFFLED_DECK_TO_TABLE_REQUEST = "SEND_SHUFFLED_DECK_TO_TABLE_REQUEST"
export const SEND_SHUFFLED_DECK_TO_TABLE_SUCCESS = "SEND_SHUFFLED_DECK_TO_TABLE_SUCCESS"
export const SEND_SHUFFLED_DECK_TO_TABLE_FAILURE = "SEND_SHUFFLED_DECK_TO_TABLE_FAILURE"


const shuffleDeck = deck => {
    return _.shuffle(deck)
}

const sendShuffledDeckToTableRequest = () => ({
    type: SEND_SHUFFLED_DECK_TO_TABLE_REQUEST
})

const sendShuffledDeckToTableSuccess = table => ({
    type: SEND_SHUFFLED_DECK_TO_TABLE_SUCCESS,
    payload: { table }
})

const sendShuffledDeckToTableFailure = error => ({
    type: SEND_SHUFFLED_DECK_TO_TABLE_FAILURE,
    payload: { error }
})

export const shuffleAndDeal = (tableId, deck) => {
    let shuffledDeck = shuffleDeck(deck)
    return dispatch => {
        
        dispatch(sendShuffledDeckToTableRequest())

        axios.put("http://localhost:1234/tables/" + tableId, {
            deck: shuffledDeck
        })
        .then(table => {
            dispatch(sendShuffledDeckToTableSuccess(table))
        })
        .catch(error => {
            dispatch(sendShuffledDeckToTableFailure(error))
        })
    }
}