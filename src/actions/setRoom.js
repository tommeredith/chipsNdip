import firebase from 'firebase'

export const SET_ROOM_REQUEST = "SET_ROOM_REQUEST"
export const SET_LOCAL_USER_REQUEST = "SET_LOCAL_USER_REQUEST"

export const setRoomRequest = room => ({
    type: SET_ROOM_REQUEST,
    room
})

export const setLocalUser = user => ({
    type: SET_LOCAL_USER_REQUEST,
    user
})

export const setRoom = (roomId, userId) => {

    return dispatch => {

        let roomRef = firebase.database().ref('rooms/' + roomId);
        
        let userRef = firebase.database().ref('rooms/' + roomId + '/users/' + userId)
        
        roomRef.once('value').then(snapshot => {
            dispatch(setRoomRequest(snapshot.val()))
        })

        userRef.once('value').then(snapshot => {
            dispatch(setLocalUser(snapshot.val()))
        })
        
    }
}