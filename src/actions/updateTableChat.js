import axios from 'axios'

export const UPDATE_TABLE_CHAT_REQUEST = "UPDATE_TABLE_CHAT_REQUEST"
export const UPDATE_TABLE_CHAT_SUCCESS = "UPDATE_TABLE_CHAT_SUCCESS"
export const UPDATE_TABLE_CHAT_FAILURE = "UPDATE_TABLE_CHAT_FAILURE"

const updateTableChatRequest = () => ({
    type: UPDATE_TABLE_CHAT_REQUEST
})

const updateTableChatSuccess = table => ({
    type: UPDATE_TABLE_CHAT_SUCCESS,
    payload: { table }
})

const updateTableChatFailure = error => ({
    type: UPDATE_TABLE_CHAT_FAILURE,
    payload: { error }
})


export const updateTableChat = (tableId, shitTalkMessages) => {

    return dispatch => {
        dispatch(updateTableChatRequest())

        axios.put('https://chips-n-dip-api.herokuapp.com/tables/' + tableId + '/chat', {
            shitTalkMessages
        })
        .then(table => {
            dispatch(updateTableChatSuccess(table))
        })
        .catch(err => {
            dispatch(updateTableChatFailure(err))
        })
    }
}