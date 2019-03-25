import { socket } from './config'

export const resetDeckSubscribe = callback => {
    socket.on('deck_reset_emission', (users, deck) => callback(users, deck))
}

export const resetDeckEmit = (users, deck) => {
    socket.emit('reset_deck', users, deck)
}