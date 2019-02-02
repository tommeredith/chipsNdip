import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from "react-router-dom";
import Landing from './Landing'
import Home from './Home'
import Table from './Table'

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

                <Route exact path="/table/:tableId" component={Table} />
               
            </main>
        </Router>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(RouteWrap)