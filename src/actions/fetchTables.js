import axios from 'axios'
import { URI } from './constants'

export const FETCH_TABLES_REQUEST = "FETCH_TABLES_REQUEST"
export const FETCH_TABLES_SUCCESS = "FETCH_TABLES_SUCCESS"
export const FETCH_TABLES_FAILURE = "FETCH_TABLES_FAILURE"

const fetchTablesRequest = () => ({
    type: FETCH_TABLES_REQUEST
})

const fetchTablesFailure = error => ({
    type: FETCH_TABLES_FAILURE,
    payload: { error }
})

const fetchTablesSuccess = tables => ({
    type: FETCH_TABLES_SUCCESS,
    payload: { tables }
})

export const fetchTables = () => {

    return dispatch => {
        dispatch(fetchTablesRequest())

        axios.get(URI + 'tables')
            .then(tables => {
                dispatch(fetchTablesSuccess(tables))
            })
            .catch(error => {
                dispatch(fetchTablesFailure(error))
            })
    }
}