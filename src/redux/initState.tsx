export type INIT_STATE_TYPE = {
    [x:string]:any,
    tab: "MY_KEYS"| "GEN_KEYS" | "CRYPT_OP" ,
    locale: "zh-tw"|"zh-cn"|"en",
}

export const INIT_STATE:INIT_STATE_TYPE = {
    tab: "MY_KEYS",
    locale: "zh-tw",
}