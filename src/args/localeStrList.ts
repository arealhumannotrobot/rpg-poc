import {INIT_STATE_TYPE} from '../redux/initState'


export type LOCALE_KEY_ENUM = 
    "HELLO_WORLD"|
    "YEET"
    ;

type LOCALE_STR_MAP_TYPE =  {
    [key in LOCALE_KEY_ENUM]: {
        [key in  INIT_STATE_TYPE["locale"]]: string
    }
}
export const LOCALE_STR_MAP:LOCALE_STR_MAP_TYPE = {
    "HELLO_WORLD": {
        "en":"",
        "zh-cn":"",
        "zh-tw":"",
    },
    "YEET": {
        "en":"",
        "zh-cn":"",
        "zh-tw":"",
    },
}