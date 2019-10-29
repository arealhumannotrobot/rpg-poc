export type INIT_STATE_TYPE = {
    [x:string]:any,
    tab: "MY_KEYS"| "NEW_KEYS" | "KEY_SIGNING" | "EXCH_KEY_RING" | "VERF_STRANGER" | "MSG_CRYPT",
}

export const INIT_STATE:INIT_STATE_TYPE = {
    tab: "MY_KEYS",

}