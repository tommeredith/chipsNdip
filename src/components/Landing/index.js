import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { startRoom } from '../../actions/startRoom'
import _ from 'underscore'
import { setUser } from '../../actions/setUser'
import { setRoom } from '../../actions/setRoom'

const Landing = ({ loggedInUser, firebaseLogin, startRoomAndSetCreatedRoomId, createdRoomId, createdUserId, selectRoom }) => {
    return (
        <section>
           <h1>Poker</h1>
            {_.isEmpty(loggedInUser) ? (
                <div>
                    <button onClick={() => firebaseLogin()}>Gotta log in</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => startRoomAndSetCreatedRoomId(loggedInUser)}>Start a game</button>

                    {createdRoomId !== '' && (
                        <p>
                            look at you, dawg. just created a room (with a user id:{createdUserId}) with an id: {<Link to={`/room/${createdRoomId}`} onClick={() => selectRoom(createdRoomId, createdUserId)}>{createdRoomId}</Link>}
                        </p>
                    )}
                </div>
            )}
        </section>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.user.user,
    createdRoomId: state.createdRoomId,
    createdUserId: state.createdUserId
})

const mapDispatchToProps = dispatch => ({
    firebaseLogin: () => dispatch(setUser()),
    startRoomAndSetCreatedRoomId: user => dispatch(startRoom(user)),
    selectRoom: (roomId, userId) => dispatch(setRoom(roomId, userId))
})


export default connect(mapStateToProps, mapDispatchToProps)(Landing)