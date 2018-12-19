import firebase from 'firebase'
import { createDeck } from '../helpers/createDeck'


export const startRoom = () => {

    const deck = createDeck()
    const database = firebase.database()

    console.log('deck', deck)
    let newRoomKey = database.ref().child('rooms').push().key

    database.ref('rooms/' + newRoomKey).set({
        deck
    })
}
