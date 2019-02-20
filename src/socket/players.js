import { socket } from './config'

export const subscribePlayer = () => {
    socket.emit('player_added')
    socket.on('connected_players')

}