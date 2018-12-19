import { SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_FAILURE } from '../actions/setUser'

const initialState = {
    user: {},
    error: null,
    loading: false
}

const user = (state = initialState, action) => {
    let stateObject
    switch (action.type) {
        case SET_USER_REQUEST:
            
            stateObject = {
                loading: true,
                error: null
            }
            return Object.assign({}, state, stateObject)

        case SET_USER_SUCCESS:
       
            stateObject = {
                loading: false,
                user: action.payload.user
            }
            return Object.assign({}, state, stateObject)

        case SET_USER_FAILURE:
            
            stateObject = {
                loading: false,
                error: action.payload.error
            }
            return Object.assign({}, state, stateObject)
    
        default:
           return state
    }
}

export default user