import axios from 'axios'
import { URI } from './constants'

export const DEAL_SHARED_CARDS_REQUEST = "DEAL_SHARED_CARDS_REQUEST"
export const DEAL_SHARED_CARDS_FAILURE = "DEAL_SHARED_CARDS_FAILURE"
export const DEAL_SHARED_CARDS_SUCCESS = "DEAL_SHARED_CARDS_SUCCESS"


export const dealSharedCardsRequest = () => ({
    type: DEAL_SHARED_CARDS_REQUEST
})

export const dealSharedCardsFailure = error => ({
    type: DEAL_SHARED_CARDS_FAILURE,
    payload: { error }
})

export const dealSharedCardsSuccess = table => ({
    type: DEAL_SHARED_CARDS_SUCCESS,
    payload: { table }
})

export const dealSharedCards = (table, deck, sharedCardSection) => {

    let sharedCards = []
        
    if ( !table.flopShown ) {
        sharedCards = table.sharedCards.concat(deck.splice(0,3))
    }

    if ( table.flopShown & !table.turnShown ) {
        sharedCards = table.sharedCards.concat(deck.splice(0,1))
    }

    if ( table.flopShown & table.turnShown & !table.riverShown ) {
        sharedCards = table.sharedCards.concat(deck.splice(0,1))
    }

    return dispatch => {
        dispatch(dealSharedCardsRequest())

        axios.put(`${URI}tables/${table._id}/addSharedCards`, {
            sharedCards,
            sharedCardSection,
            deck
        })
        .then(table => {
            dispatch(dealSharedCardsSuccess(table))
        })
        .catch(error => {
            dispatch(dealSharedCardsFailure(error))
        })
    }
}