/**Long ASCII Armored string of PGP key */
export type KEY_ASC_STRING = string;

export type TYPE_MY_RPG_KEYS = {
    [keyThumb:string]: {
        privateKey: KEY_ASC_STRING,
        publicKey: KEY_ASC_STRING,
        alias?: string,
        email?: string,
    }
}

export const KEY_MY_RPG_KEYS = "KEY_MY_RPG_KEYS";