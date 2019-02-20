import { socket } from './config'

export const subscribeToTimer = cb => {
    socket.on('timer', timestamp => cb(null, timestamp))
    socket.emit('subscribeToTimer', 1000)
}
