import firebase from 'firebase'

const initializeFirebase = () => {
    var config = {
        apiKey: "AIzaSyDfl00A6MzezaleFKsqr5U8D_pyjY8lqqo",
        authDomain: "chips-n-dip.firebaseapp.com",
        databaseURL: "https://chips-n-dip.firebaseio.com",
        projectId: "chips-n-dip",
        storageBucket: "chips-n-dip.appspot.com",
        messagingSenderId: "815494643899"
    };
    
    firebase.initializeApp(config);
}


// Get a reference to the database service
const database = firebase.database();


export { database, initializeFirebase }