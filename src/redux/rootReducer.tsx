import { combineReducers } from "redux";
import { reduce_tab } from "./reduce_tab";
import { reduce_locale } from "./reduce_locale";


export const rootReducer = combineReducers({
    tab:reduce_tab,
    locale: reduce_locale,
})