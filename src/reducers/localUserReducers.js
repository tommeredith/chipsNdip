import { SET_LOCAL_USER_REQUEST } from '../actions/setRoom'

const localUser = (state = {}, action) => {

    switch (action.type) {
        case SET_LOCAL_USER_REQUEST:
            return action.user
    
        default:
            return state
    }
}

export default localUser