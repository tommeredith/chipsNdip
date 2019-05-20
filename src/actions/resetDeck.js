import axios from 'axios'
import { URI } from './constants'

export const RESET_DECK_REQUEST = "RESET_DECK_REQUEST"
export const RESET_DECK_SUCCESS = "RESET_DECK_SUCCESS"
export const RESET_DECK_FAILURE = "RESET_DECK_FAILURE"

const resetDeckRequest = () => ({
    type: RESET_DECK_REQUEST
})

const resetDeckFailure = error => ({
    type: RESET_DECK_FAILURE,
    payload: { error }
})

const resetDeckSuccess = table => ({
    type: RESET_DECK_SUCCESS,
    payload: { table }
})


export const resetDeck = (tableId, users, deck) => {
    return dispatch => {
        dispatch(resetDeckRequest())

        axios.put(URI + 'tables/' + tableId + '/deck/reset', {
            deck,
            users
        })
        .then(table => {
            dispatch(resetDeckSuccess(table))
        })
        .catch(error => {
            dispatch(resetDeckFailure(error))
        })

    }
}