import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../actions/createUser'
import { loginUser } from '../../actions/loginUser'

const Landing = ({ createUser, loginUser }) => {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isSignUp, toggleIsSignUp] = useState(false)
    
    return (
        <section>
            <div>
                {isSignUp ? (
                    <div>
                        <p>
                            Gotta sign up
                        </p>
                        <p>
                            username
                        </p>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                ) : (
                    <p>
                        Gotta log in
                    </p>
                )}
               
                <p>
                    email
                </p>
                <input type="text" onChange={(e) => setUserEmail(e.target.value)}/>
                <p>
                    password
                </p>
                <input type="password" onChange={(e) => setUserPassword(e.target.value)}/>
                {isSignUp ? (
                    <button onClick={() => createUser(userEmail, userPassword, username)}>click it, ya bitch</button>
                ) : (
                    <button onClick={() => loginUser(userEmail, userPassword)}>click it, ya bitch</button>
                )}
                
                {isSignUp ? (
                    <button onClick={() => toggleIsSignUp(false)}>finna log in?</button>
                ) : (
                    <button onClick={() => toggleIsSignUp(true)}>finna sign up?</button>
                )}
            </div>
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    createUser: (email, password, username) => dispatch(createUser(email, password, username)),
    loginUser: (email, password) => dispatch(loginUser(email, password))
})

export default connect(null, mapDispatchToProps)(Landing)