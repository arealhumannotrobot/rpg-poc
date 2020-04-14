/* 
    This reducer is for Locale (AKA Language)
*/
import { INIT_STATE, INIT_STATE_TYPE } from "./initState"

//-----------------------------------
export const ACT_TYPE_TAB_SET_LOCALE = 'ACT_TYPE_TAB_SET_LOCALE';
type actIntent_locale_SetLocale = {
    type: typeof ACT_TYPE_TAB_SET_LOCALE
    locale: INIT_STATE_TYPE["locale"]
}
export const actcreate_locale_setLocale = (locale:INIT_STATE_TYPE["locale"]):actIntent_locale_SetLocale=>{
    return { type: ACT_TYPE_TAB_SET_LOCALE, locale };
}

//===================================


type actIntent_locale = actIntent_locale_SetLocale;
export function reduce_locale(state=INIT_STATE["locale"], action:actIntent_locale){
    switch (action.type) {
        case ACT_TYPE_TAB_SET_LOCALE:
            return action.locale;
        default:
            return state;
    }
}