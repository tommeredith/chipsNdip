import { socket } from './config'

export const talkShitSubscribe = callback => {
    socket.on('shit_talked', shitTalkMessage => callback(shitTalkMessage))
}

export const talkShitEmit = (user, message) => {
    const fullMessage = {
        username: user.username,
        message
    }
    socket.emit('talk_shit', fullMessage)
}