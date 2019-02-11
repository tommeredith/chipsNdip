import _ from 'underscore'
import React from 'react'
import { connect } from 'react-redux'
import lifecycle from 'react-pure-lifecycle'
import { HashRouter as Router, Route } from "react-router-dom";
import Landing from './Landing'
import Home from './Home'
import Table from './Table'
import { getUserInStorage } from '../actions/userInStorage'

const lifecycleMethods = {
    componentWillMount({ checkStorageForUser }){
        checkStorageForUser()
    }
}

const RouteWrap = ({ authedUser, checkStorageForUser }) => {

    return (
        <Router>
            <main>
                <header>
                    <h1>
                        Swamp THAAAANG
                    </h1>
                </header>
                <Route exact path="/" render={() => (
                    !_.isEmpty(authedUser) ? (
                        <Home />
                    ) : (
                        <Landing />
                    )
                )} />

                <Route exact path="/table/:tableId" component={Table} />
               
            </main>
        </Router>
    )
}

const mapStateToProps = state => ({
    authedUser: state.user.user
})

const mapDispatchToProps = dispatch => ({
    checkStorageForUser: () => dispatch(getUserInStorage())
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(RouteWrap))