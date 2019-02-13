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