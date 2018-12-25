import firebase from 'firebase'

export const ADD_USER = "ADD_USER"

export const addUser = roomId => {
    let roomRef = firebase.database().ref('rooms/' + roomId);

    const newUserKey = firebase.database().ref('rooms/' + roomId + '/users').push().key

    let fakeUser = {
        name: 'Steph Curry'
    }

   
    let updateObj = {}
    updateObj['/rooms/' + roomId + "/users/" + newUserKey] = fakeUser

    firebase.database().ref().update(updateObj)
}

