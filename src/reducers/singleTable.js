import { FETCH_SINGLE_TABLE_FAILURE, FETCH_SINGLE_TABLE_SUCCESS, FETCH_SINGLE_TABLE_REQUEST } from '../actions/fetchTableById'
import { SHUFFLE_DECK_AND_DEAL_SUCCESS, SHUFFLE_DECK_AND_DEAL_FAILURE, SHUFFLE_DECK_AND_DEAL_REQUEST } from '../actions/shuffleAndDeal'
import { UPDATE_TABLE_USERS_SUCCESS } from '../actions/updateTableUsers'
import { RESET_DECK_REQUEST, RESET_DECK_SUCCESS, RESET_DECK_FAILURE } from '../actions/resetDeck'
import { DEAL_SHARED_CARDS_REQUEST, DEAL_SHARED_CARDS_FAILURE, DEAL_SHARED_CARDS_SUCCESS } from '../actions/dealSharedCards'

const initialState = {
    loading: true,
    table: {},
    error: null
}

export const singleTable = (state = initialState, action) => {
    let stateObj

    switch (action.type) {
        case FETCH_SINGLE_TABLE_REQUEST:
        case SHUFFLE_DECK_AND_DEAL_REQUEST:
        case RESET_DECK_REQUEST:
        case DEAL_SHARED_CARDS_REQUEST:
            stateObj = {
                loading: true,
                error: null,
                table: {}
            }
            return stateObj

        case FETCH_SINGLE_TABLE_FAILURE:
        case SHUFFLE_DECK_AND_DEAL_FAILURE:
        case RESET_DECK_FAILURE:
        case DEAL_SHARED_CARDS_FAILURE:
            stateObj = {
                loading: false,
                error: action.payload.error,
                table: {}
            }
            return stateObj

        case FETCH_SINGLE_TABLE_SUCCESS:
        case SHUFFLE_DECK_AND_DEAL_SUCCESS:
        case UPDATE_TABLE_USERS_SUCCESS:
        case RESET_DECK_SUCCESS:
        case DEAL_SHARED_CARDS_SUCCESS:
            stateObj = {
                loading: false,
                error: null,
                table: action.payload.table.data
            }
            return stateObj
    
        default:
            return state
    }
}