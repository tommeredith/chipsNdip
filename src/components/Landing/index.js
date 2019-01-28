import React from 'react'
import { connect } from 'react-redux'

const Landing = () => {

    return (
        <section>
            <div>
                <p>
                    Gotta log in
                </p>

                {/* <button onClick={() => logInAndAuth()}>click it, ya bitch</button> */}
            </div>
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
   
})

export default connect(null, mapDispatchToProps)(Landing)