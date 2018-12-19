import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../../actions/setUser'

const Login = ({ firebaseLogin }) => {

    return (
        <section>
            <h1>
                Poker Login
            </h1>

            <button onClick={() => firebaseLogin()}>Log in</button>
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    firebaseLogin: () => dispatch(setUser())
})

export default connect(null, mapDispatchToProps)(Login)