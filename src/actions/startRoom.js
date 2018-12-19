import firebase from 'firebase'
import { createDeck } from '../helpers/createDeck'


export const startRoom = user => {
    const deck = createDeck()
    const database = firebase.database()

    let newRoomKey = database.ref().child('rooms').push().key

    let userObj = {}

    userObj[0] = {
        displayName: user.displayName,
        email: user.email,
        meta: user.metadata
    }
    database.ref('rooms/' + newRoomKey).set({
        deck: deck,
        users: userObj
    })
}
