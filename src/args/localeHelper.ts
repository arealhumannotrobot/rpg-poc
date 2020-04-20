import {store} from "../redux/store";
import { LOCALE_KEY_ENUM, LOCALE_STR_MAP } from "./localeStrList";
import { INIT_STATE_TYPE } from "../redux/initState";

export const localStr =  <KeyEnum extends string[]> (
    localeKey:typeof LOCALE_KEY_ENUM[number]&KeyEnum[number], 
    customMap?:{[key in KeyEnum[number]]: { [key in  INIT_STATE_TYPE["locale"]]: string} }
)=>{
    if (customMap) {
        return customMap[localeKey][store.getState().locale]?
               customMap[localeKey][store.getState().locale]:
               customMap[localeKey]["en"];
    }

    return LOCALE_STR_MAP[localeKey][store.getState().locale]?
           LOCALE_STR_MAP[localeKey][store.getState().locale]:
           LOCALE_STR_MAP[localeKey]["en"];
}