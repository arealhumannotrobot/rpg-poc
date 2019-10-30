import { combineReducers } from "redux";
import { reduce_tab } from "./reduce_tab";


export const rootReducer = combineReducers({
    tab:reduce_tab,
})