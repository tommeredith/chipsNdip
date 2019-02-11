import axios from 'axios'
import { setUserInStorage } from './userInStorage'

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST"
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const LOGIN_USER_PASSWORD_FAILURE = "LOGIN_USER_PASSWORD_FAILURE"
export const LOGIN_USER_EMAIL_MATCH_FAILURE = "LOGIN_USER_EMAIL_MATCH_FAILURE"
export const LOGIN_USER_MULTIPLE_EMAIL_FAILURE = "LOGIN_USER_MULTIPLE_EMAIL_FAILURE"

const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST
})

const loginUserFailure = error => ({
    type: LOGIN_USER_FAILURE,
    payload: { error }
})

const loginUserSuccess = user => ({
    type: LOGIN_USER_SUCCESS,
    payload: { user }
})

const loginUserPasswordFailure = () => ({
    type: LOGIN_USER_PASSWORD_FAILURE,
    payload: { error: "passwords dont match" }
})

const loginUserEmailMatchFailure = () => ({
    type: LOGIN_USER_EMAIL_MATCH_FAILURE,
    payload: { error: "no email match" }
})

const loginUserMultipleEmailFailure = () => ({
    type: LOGIN_USER_MULTIPLE_EMAIL_FAILURE,
    payload: { error: "multiple users for same email" }
})

export const loginUser = (email, password) => {
   
    return dispatch => {
        dispatch(loginUserRequest())


        // THIS NEEDS TO BE CHANGED TO HANDLE A POST REQUEST WITH THE USER
        // AND PASSWORD TO FIND A USER ON THE BACKEND RATHER THAN WHAT YOU'RE
        // DOING HERE
        axios.post('http://localhost:1234/users/login', {
            email,
            password 
        })
        .then(user => {
            dispatch(loginUserSuccess(user))

            dispatch(setUserInStorage(user))
        })
        .catch(error => {
            dispatch(loginUserFailure(error))
        })
    }
}