import axios from 'axios'
import { hardResetUserInStorage } from './userInStorage';

export const UPDATE_USER_ASSOCIATED_TABLES_REQUEST = "UPDATE_USER_ASSOCIATED_TABLES_REQUEST"
export const UPDATE_USER_ASSOCIATED_TABLES_SUCCESS = "UPDATE_USER_ASSOCIATED_TABLES_SUCCESS"
export const UPDATE_USER_ASSOCIATED_TABLES_FAILURE = "UPDATE_USER_ASSOCIATED_TABLES_FAILURE"

const updateUserAssociatedTablesRequest = () => ({
    type: UPDATE_USER_ASSOCIATED_TABLES_REQUEST
})

const updateUserAssociatedTablesSuccess = user => ({
    type: UPDATE_USER_ASSOCIATED_TABLES_SUCCESS,
    payload: { user }
})

const updateUserAssociatedTablesFailure = error => ({
    type: UPDATE_USER_ASSOCIATED_TABLES_FAILURE,
    payload: { error }
})


export const updateUserAssociatedTables = (userId, tableId) => {

    return dispatch => {
        dispatch(updateUserAssociatedTablesRequest())

        axios.put('http://localhost:1234/users/' + userId + '/updateAssociatedTable', {
            tableId
        })
        .then(user => {
            dispatch(updateUserAssociatedTablesSuccess(user))
        })
        .then(() => {
            dispatch(hardResetUserInStorage(userId))
        })
        .catch(err => {
            dispatch(updateUserAssociatedTablesFailure(err))
        })
    }
}