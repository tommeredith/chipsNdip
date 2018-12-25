import firebase from 'firebase'
import { createDeck } from '../helpers/createDeck'

export const SET_CREATED_ROOM_ID = "SET_CREATED_ROOM_ID"
export const SET_CREATED_USER_ID = "SET_CREATED_USER_ID"

export const setCreatedRoomId = createdRoomId => ({
    type: SET_CREATED_ROOM_ID,
    createdRoomId
})

export const setCreatedUserId = createdUserId => ({
    type: SET_CREATED_USER_ID,
    createdUserId
})

export const startRoom = user => {
    const deck = createDeck()
    const database = firebase.database()

    let newRoomKey = database.ref().child('rooms').push().key

    let newUserKey = database.ref('rooms/' + newRoomKey + '/users').push().key

    let userObj = {}

    userObj[newUserKey] = {
        displayName: user.displayName,
        email: user.email,
        meta: user.metadata,
        currentHand: {0: {suit:'spades', rank: 4}, 1:{suit: 'diamonds', rank: 9}}
    }

    database.ref('rooms/' + newRoomKey).set({
        deck: deck,
        users: userObj
    })


    return dispatch => {

        dispatch(setCreatedRoomId(newRoomKey))

        dispatch(setCreatedUserId(newUserKey))
    }
}
