import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../actions/addUser'
import _ from 'underscore'
import Card from '../Card'

const Room = ({ match, room, addUserToGame, localUserInRoom }) => {
    console.log('localUserInRoom', localUserInRoom)
    return (
        <section>
            <h1>
                Poker Table ID: {match.params.id}
            </h1>
            
            <button onClick={() => addUserToGame(match.params.id)}>add user</button>

            <button>shuffle deck and deal</button>


            <div>
                <h4>My hand</h4>
                {_.map(localUserInRoom.currentHand, card => {
                    console.log('card', card)
                    return (
                        <Card card={card}/>
                    )
                })}
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    room: state.room,
    localUserInRoom: state.localUser
})

const mapDispatchToProps = dispatch => ({
    addUserToGame: roomId => dispatch(addUser(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)