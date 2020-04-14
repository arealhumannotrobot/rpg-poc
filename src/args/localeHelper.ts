import {store} from "../redux/store";
import { LOCALE_KEY_ENUM, LOCALE_STR_MAP } from "./localeStrList";

const localStr = (k:LOCALE_KEY_ENUM)=>{
    return LOCALE_STR_MAP[k][store.getState().locale]?LOCALE_STR_MAP[k][store.getState().locale]:LOCALE_STR_MAP[k]["en"];
}