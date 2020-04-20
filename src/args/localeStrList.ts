import {INIT_STATE_TYPE} from '../redux/initState'



export const LOCALE_KEY_ENUM = [
    "navbar-my-key",
    "navbar-gen-key",
    "navbar-import-key",
    "navbar-crypto-op",
    "navbar-manual-link",
] as const;

type LOCALE_STR_MAP_TYPE =  {
    [key in typeof LOCALE_KEY_ENUM[number]]: {
        [key in  INIT_STATE_TYPE["locale"]]: string
    }
}
export const LOCALE_STR_MAP:LOCALE_STR_MAP_TYPE = {
    "navbar-my-key": {
        "zh-tw":"我的鎖匙庫",
        "zh-cn":"我的锁匙库",
        "en":"My Key Chain",
    },
    "navbar-gen-key":{
        "zh-tw":"生成匙對",
        "zh-cn":"生成匙对",
        "en":"Generate New Key",
    },
    "navbar-import-key":{
        "zh-tw":"導入鑰匙",
        "zh-cn":"导入钥匙",
        "en":"Import Keys",
    },
    "navbar-crypto-op":{
        "zh-tw":"加密/簽名操作",
        "zh-cn":"加密/签名操作",
        "en":"Crypto Operation",
    },
    "navbar-manual-link":{
        "zh-tw":"說明",
        "zh-cn":"说明",
        "en":"Instruction",
    },
}