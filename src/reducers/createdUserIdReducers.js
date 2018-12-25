import { SET_CREATED_USER_ID } from '../actions/startRoom'

const createdUserId = (state = '', action) => {

    switch (action.type) {
        case SET_CREATED_USER_ID:
            return action.createdUserId

        default:
           return state
    }
}

export default createdUserId