import React from 'react'
import {connect} from 'react-redux'
import { startRoom } from '../../actions/startRoom'
import _ from 'underscore'
import { setUser } from '../../actions/setUser'

const Landing = ({ loggedInUser, firebaseLogin }) => {
    return (
        <section>
           <h1>Poker</h1>
            {_.isEmpty(loggedInUser) ? (
                <button onClick={() => firebaseLogin()}>Gotta log in</button>
            ) : (
                <button onClick={() => startRoom(loggedInUser)}>Start a game</button>
            )}
            
        </section>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.user.user
})

const mapDispatchToProps = dispatch => ({
    firebaseLogin: () => dispatch(setUser())
})


export default connect(mapStateToProps, mapDispatchToProps)(Landing)