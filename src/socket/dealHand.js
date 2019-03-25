import { socket } from './config'

export const dealHandSubscribe = callback => {
    socket.on('hand_dealt', (users, deck) => callback(users, deck))
}

export const dealHandEmit = (users, deck) => {
    socket.emit('deal_hand', users, deck)
}