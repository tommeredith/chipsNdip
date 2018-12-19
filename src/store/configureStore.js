import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from 'redux-logger';
import { rootReducer } from "../reducers";
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}
