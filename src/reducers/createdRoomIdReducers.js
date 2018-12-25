import { SET_CREATED_ROOM_ID } from '../actions/startRoom'

const createdRoomId = (state = '', action) => {

    switch (action.type) {
        case SET_CREATED_ROOM_ID:
            return action.createdRoomId

        default:
           return state
    }
}

export default createdRoomId