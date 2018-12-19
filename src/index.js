import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import RouteWrap from './components'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <RouteWrap />
    </Provider>,
    document.getElementById("root")
);
