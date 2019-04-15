import axios from 'axios'
import { updateUserAssociatedTables } from './updateUserAssociatedTables'
import { URI } from './constants'
 
export const CREATE_TABLE_REQUEST = "CREATE_TABLE_REQUEST"
export const CREATE_TABLE_SUCCESS = "CREATE_TABLE_SUCCESS"
export const CREATE_TABLE_FAILURE = "CREATE_TABLE_FAILURE"


export const buildDeck = () => {
    const deck = []
    const suits = ["spades", "hearts", "clubs", "diamonds"]
    
    suits.map(suit => {
        for (let i = 1; i <= 13; i++) {
            let rank = i

            switch (i) {
                case 11:
                    rank = 'jack'
                    break
                case 12:
                    rank = 'queen'
                    break
                case 13:
                    rank = 'king'
                    break
                case 1:
                    rank = 'ace'
                    break
            
                default:
                    break;
            }

            const cardObj = {
                suit,
                rank
            }
            deck.push(cardObj)
            
        }
    })

    return deck
}

const createTableRequest = () => ({
    type: CREATE_TABLE_REQUEST
})

const createTableFailure = error => ({
    type: CREATE_TABLE_FAILURE,
    payload: { error }
})

const createTableSuccess = table => ({
    type: CREATE_TABLE_SUCCESS,
    payload: { table }
})

export const createTable = (tableName, tableSeats, user) => {
    const deck = buildDeck()
    let usersArr = []
    usersArr.push(user)

    return dispatch => {
        dispatch(createTableRequest())

        axios.post(URI + 'tables', { 
                "title": tableName,
                "deck": deck,
                "users": usersArr,
                "seats": tableSeats
            })
            .then(table => {
                dispatch(createTableSuccess(table))
                dispatch(updateUserAssociatedTables(user._id, table.data._id))
            })
            .catch(error => {
                dispatch(createTableFailure(error))
            })
    }
}