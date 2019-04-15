import axios from 'axios'
import { URI } from './constants'

export const FETCH_SINGLE_TABLE_REQUEST = "FETCH_SINGLE_TABLE_REQUEST"
export const FETCH_SINGLE_TABLE_SUCCESS = "FETCH_SINGLE_TABLE_SUCCESS"
export const FETCH_SINGLE_TABLE_FAILURE = "FETCH_SINGLE_TABLE_FAILURE"

const fetchSingleTableRequest = () => ({
    type: FETCH_SINGLE_TABLE_REQUEST
})

const fetchSingleTableFailure = error => ({
    type: FETCH_SINGLE_TABLE_FAILURE,
    payload: { error }
})

const fetchSingleTableSuccess = table => ({
    type: FETCH_SINGLE_TABLE_SUCCESS,
    payload: { table }
})

export const fetchTableById = tableId => {

    return dispatch => {
        dispatch(fetchSingleTableRequest())

        axios.get(URI + 'tables/' + tableId)
            .then(table => {
                dispatch(fetchSingleTableSuccess(table))
            })
            .catch(error => {
                dispatch(fetchSingleTableFailure(error))
            })
    }
}