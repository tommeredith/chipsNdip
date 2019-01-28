import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from "react-router-dom";
import Landing from './Landing'
import Home from './Home'

const RouteWrap = () => {

    return (
        <Router>
            <main>
                <header>
                    <h1>
                        Swamp THAAAANG
                    </h1>
                </header>
                <Route exact path="/" render={() => (
                    // authedUser || storedUser ? (
                    //     <Home />
                    // ) : (
                        // <Landing />
                        <Home />
                    // )
                )} />
               
            </main>
        </Router>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteWrap)