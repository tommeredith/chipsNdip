import axios from 'axios'

export const DELETE_TABLE_REQUEST = "DELETE_TABLE_REQUEST"
export const DELETE_TABLE_FAILURE = "DELETE_TABLE_FAILURE"
export const DELETE_TABLE_SUCCESS = "DELETE_TABLE_SUCCESS"

export const deleteTableRequest = () => ({
    type: DELETE_TABLE_REQUEST
})

export const deleteTableFailure = error => ({
    type: DELETE_TABLE_FAILURE,
    payload: { error }
})

export const deleteTableSuccess = tableId => ({
    type: DELETE_TABLE_SUCCESS,
    payload: { tableId }
})

export const deleteTable = tableId => {

    return dispatch => {
        dispatch(deleteTableRequest())

        axios.delete('https://chips-n-dip-api.herokuapp.com/tables/' + tableId)
        .then(() => {
            dispatch(deleteTableSuccess(tableId))
        })
        .catch(error => {
            dispatch(deleteTableFailure(error))
        })
    }
}