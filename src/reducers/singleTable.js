import { FETCH_SINGLE_TABLE_FAILURE, FETCH_SINGLE_TABLE_SUCCESS, FETCH_SINGLE_TABLE_REQUEST } from '../actions/fetchTableById'
import { SEND_SHUFFLED_DECK_TO_TABLE_SUCCESS, SEND_SHUFFLED_DECK_TO_TABLE_FAILURE, SEND_SHUFFLED_DECK_TO_TABLE_REQUEST } from '../actions/shuffleAndDeal'

const initialState = {
    loading: true,
    table: {},
    error: null
}

export const singleTable = (state = initialState, action) => {
    let stateObj

    switch (action.type) {
        case FETCH_SINGLE_TABLE_REQUEST:
        case SEND_SHUFFLED_DECK_TO_TABLE_REQUEST:
            stateObj = {
                loading: true,
                error: null,
                table: {}
            }
            return stateObj

        case FETCH_SINGLE_TABLE_FAILURE:
        case SEND_SHUFFLED_DECK_TO_TABLE_FAILURE:
            stateObj = {
                loading: false,
                error: action.payload.error,
                table: {}
            }
            return stateObj

        case FETCH_SINGLE_TABLE_SUCCESS:
        case SEND_SHUFFLED_DECK_TO_TABLE_SUCCESS:
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