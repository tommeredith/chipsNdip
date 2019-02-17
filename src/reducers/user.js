import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from '../actions/createUser'
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../actions/loginUser'
import { SET_USER_IN_STORAGE, GET_USER_IN_STORAGE } from '../actions/userInStorage'
import { UPDATE_USER_ASSOCIATED_TABLES_SUCCESS } from '../actions/updateUserAssociatedTables'

const initialState = {
    loading: false,
    user: {},
    error: null
}

export const user = (state = initialState, action) => {

    let userObj

    switch (action.type) {
        case CREATE_USER_REQUEST:
        case LOGIN_USER_REQUEST:
            userObj = {
                loading: true,
                user: {},
                error: null
            }
            return userObj

        case CREATE_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
        case SET_USER_IN_STORAGE:
        case GET_USER_IN_STORAGE:
        case UPDATE_USER_ASSOCIATED_TABLES_SUCCESS:
            userObj = {
                loading: false,
                user: action.payload.user.data,
                error: null
            }
            
            return userObj

        case CREATE_USER_FAILURE:
        case LOGIN_USER_FAILURE:
            userObj = {
                loading: false,
                user: {},
                error: action.payload.error
            }
            
            return userObj
    
        default:
            return state
    }
}