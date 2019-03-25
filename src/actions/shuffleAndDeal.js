import _ from 'underscore'
import axios from 'axios'
import { buildDeck } from './createTable'

export const SHUFFLE_DECK = "SHUFFLE_DECK"
export const SHUFFLE_DECK_AND_DEAL_REQUEST = "SHUFFLE_DECK_AND_DEAL_REQUEST"
export const SHUFFLE_DECK_AND_DEAL_SUCCESS = "SHUFFLE_DECK_AND_DEAL_SUCCESS"
export const SHUFFLE_DECK_AND_DEAL_FAILURE = "SHUFFLE_DECK_AND_DEAL_FAILURE"


export const shuffleDeck = deck => {
    return _.shuffle(deck)
}

const shuffleDeckAndDealRequest = () => ({
    type: SHUFFLE_DECK_AND_DEAL_REQUEST
})

const shuffleDeckAndDealSuccess = table => ({
    type: SHUFFLE_DECK_AND_DEAL_SUCCESS,
    payload: { table }
})

const shuffleDeckAndDealFailure = error => ({
    type: SHUFFLE_DECK_AND_DEAL_FAILURE,
    payload: { error }
})

export const shuffleAndDeal = (tableId, users, deck) => {

    return dispatch => {
        
        dispatch(shuffleDeckAndDealRequest())

        axios.put("http://localhost:1234/tables/" + tableId + "/deal", {
            deck,
            users
        })
        .then(table => {
            dispatch(shuffleDeckAndDealSuccess(table))
        })
        .catch(error => {
            dispatch(shuffleDeckAndDealFailure(error))
        })
    }
}
