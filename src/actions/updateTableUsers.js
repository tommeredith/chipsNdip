import axios from 'axios'

export const UPDATE_TABLE_USERS_REQUEST = "UPDATE_TABLE_USERS_REQUEST"
export const UPDATE_TABLE_USERS_SUCCESS = "UPDATE_TABLE_USERS_SUCCESS"
export const UPDATE_TABLE_USERS_FAILURE = "UPDATE_TABLE_USERS_FAILURE"

const updateTableUsersRequest = () => ({
    type: UPDATE_TABLE_USERS_REQUEST
})

const updateTableUsersSuccess = table => ({
    type: UPDATE_TABLE_USERS_SUCCESS,
    payload: { table }
})

const updateTableUsersFailure = error => ({
    type: UPDATE_TABLE_USERS_FAILURE,
    payload: { error }
})


export const updateTableUsers = (users, tableId, authedUser) => {

    return dispatch => {
        dispatch(updateTableUsersRequest())

        axios.put('https://chips-n-dip-api.herokuapp.com/tables/' + tableId + '/users', {
            users,
            authedUser
        })
        .then(table => {
            dispatch(updateTableUsersSuccess(table))
        })
        .catch(err => {
            dispatch(updateTableUsersFailure(err))
        })
    }
}