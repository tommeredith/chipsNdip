import { combineReducers } from "redux";
import user from './userReducers'
import createdRoomId from './createdRoomIdReducers'
import createdUserId from './createdUserIdReducers'
import room from './roomReducers'
import localUser from './localUserReducers'


export const rootReducer = combineReducers({
    user,
    createdRoomId,
    createdUserId,
    room,
    localUser
});