import axios from 'axios'
import { setUserInStorage } from './userInStorage'

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST"
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"

export const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
})

export const createUserFailure = error => ({
    type: CREATE_USER_FAILURE,
    payload: { error }
})

export const createUserSuccess = user => ({
    type: CREATE_USER_SUCCESS,
    payload: { user }
})

export const createUser = (email, password, username) => {


    return dispatch => {
        dispatch(createUserRequest())

        axios.post('https://chips-n-dip-api.herokuapp.com/users', { 
            "email": email,
            "password": password,
            "username": username
        })
        .then(user => {
            dispatch(createUserSuccess(user))
            dispatch(setUserInStorage(user))
        })
        .catch(error => {
            dispatch(createUserFailure(error))
        })
    }
}