import { combineReducers } from "redux";
import { tables } from './tables'
import { singleTable } from './singleTable'


export const rootReducer = combineReducers({
    tables,
    singleTable
});