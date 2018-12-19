import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './Landing'

const RouteWrap = () => {
    return(
        <Router>
            <main>
                <Route exact path="/" component={Landing} />
            </main>
        </Router>
    )
    
}

export default RouteWrap;