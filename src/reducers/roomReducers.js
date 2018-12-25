import { SET_ROOM_REQUEST } from '../actions/setRoom'

const room = (state = {}, action) => {

    switch (action.type) {
        case SET_ROOM_REQUEST:
            return action.room

        default:
           return state
    }
}

export default room