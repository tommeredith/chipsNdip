import { updateUserAssociatedTables } from './updateUserAssociatedTables'
import { updateTableUsers } from './updateTableUsers'


export const claimSeat = (users, tableId, authedUser, seatIndex) => {

    return dispatch => {
        users[seatIndex] = authedUser

        dispatch(updateTableUsers(users, tableId))

        dispatch(updateUserAssociatedTables(authedUser._id, tableId))

    }
}