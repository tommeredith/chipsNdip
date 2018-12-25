import firebase from 'firebase'

export const SET_USER_REQUEST = "SET_USER_REQUEST"
export const SET_USER_SUCCESS = "SET_USER_SUCCESS"
export const SET_USER_FAILURE = "SET_USER_FAILURE"

export const setUserRequest = () => ({
    type: SET_USER_REQUEST
})

export const setUserFailure = error => ({
    type: SET_USER_FAILURE,
    payload: { error }
})

export const setUserSuccess = user => ({
    type: SET_USER_SUCCESS,
    payload: { user }
})

export const setUser = () => {
    
    var config = {
        apiKey: "AIzaSyDfl00A6MzezaleFKsqr5U8D_pyjY8lqqo",
        authDomain: "chips-n-dip.firebaseapp.com",
        databaseURL: "https://chips-n-dip.firebaseio.com",
        projectId: "chips-n-dip",
        storageBucket: "chips-n-dip.appspot.com",
        messagingSenderId: "815494643899"
    };
    
    firebase.initializeApp(config);

    const googleLogin = new firebase.auth.GoogleAuthProvider();

    return dispatch => {
        dispatch(setUserRequest())

        
        return firebase.auth().signInWithPopup(googleLogin)
            .then(result => {
                dispatch(setUserSuccess(result.user))
            })
            .catch(error => {
                dispatch(setUserError(error))
            });
    }

}