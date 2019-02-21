import axios from 'axios'

export const GET_USER_IN_STORAGE = "GET_USER_IN_STORAGE"
export const SET_USER_IN_STORAGE = "SET_USER_IN_STORAGE"

export const getUserInStorageAction = user => ({
    type: GET_USER_IN_STORAGE,
    payload: { user }
})

export const setUserInStorageAction = user => ({
    type: SET_USER_IN_STORAGE,
    payload: { user }
})


export const setUserInStorage = user => {
    localStorage.setItem('chipDipUser', JSON.stringify(user))

    return dispatch => {
        dispatch(setUserInStorageAction(user))
    }
}

export const getUserInStorage = () => {
    const storedUser = JSON.parse(localStorage.getItem('chipDipUser'))
   
    return dispatch => {
        
        storedUser && dispatch(getUserInStorageAction(storedUser))
    }
}

export const hardResetUserInStorage = userId => {
    
    return dispatch => {
        axios.get('http://localhost:1234/users/' + userId)
        .then(user => {
            console.log('user in hardResetUserInStorage: ', user)
            localStorage.setItem('chipDipUser', JSON.stringify(user))
            dispatch(setUserInStorageAction(user))
        })
    }
   
    
}