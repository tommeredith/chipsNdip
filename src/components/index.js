import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './Landing'
import Room from './Room'

const RouteWrap = () => {
    return(
        <Router>
            <main>
                <Route exact path="/" component={Landing} />

                <Route path="/room/:id" component={Room} />
            </main>
        </Router>
    )
    
}

export default RouteWrap;