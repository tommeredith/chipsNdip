import {FETCH_TABLES_FAILURE, FETCH_TABLES_SUCCESS, FETCH_TABLES_REQUEST} from '../actions/fetchTables'

const initialState = {
    loading: true,
    tables: [],
    error: null
}

export const tables = (state = initialState, action) => {
    let stateObj

    switch (action.type) {
        case FETCH_TABLES_REQUEST:
            stateObj = {
                loading: true,
                error: null,
                tables: []
            }
            return stateObj

        case FETCH_TABLES_FAILURE:
            stateObj = {
                loading: false,
                error: action.payload.error,
                tables: []
            }
            return stateObj

        case FETCH_TABLES_SUCCESS:
            stateObj = {
                loading: false,
                error: null,
                tables: action.payload.tables.data
            }
            return stateObj
    
        default:
            return state
    }
}