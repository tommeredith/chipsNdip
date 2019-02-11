import { combineReducers } from "redux";
import { tables } from './tables'
import { singleTable } from './singleTable'
import { user } from './user'


export const rootReducer = combineReducers({
    tables,
    singleTable,
    user
});