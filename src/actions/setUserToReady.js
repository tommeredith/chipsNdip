import { updateTableUsers } from './updateTableUsers'


export const setUserToReady = (users, tableId, authedUser) => {

    return dispatch => {

        users.map(user => {
            if ( user._id === authedUser._id ) {
                user['isReady'] = true
            }
        })

        dispatch(updateTableUsers(users, tableId, authedUser))

    }
}