# Proof of Concept: Rapid PGP (RPG)

A Progressive Web App that conveniently generate PGP keys (specifically, ed25519 for lightweightness), signing public keys, exchanging key ring of trust to help build a decentralized web of trust. Ideally this web app does not require internet connection at all except for the initial connection to load the page.

This is intended to be a proof of concept. Using React simply because I have experience on React Native (had it backward, I know).

For people who wanna work on it, it is highly recommended to fork it instead of opening a pull request as I'm awful at collabration.

----------------------------------

## Resource
1. [OpenPGP.js](https://openpgpjs.org/)
  - [Documentation](https://openpgpjs.org/openpgpjs/doc/)
2. [subtlecrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)

## TODO
1. PGP
  - keygen: ✓ (w/ Alias, Email, Passphrase)
  - Store key(s) #DB
  - Signing a Key
    - ! need previously agreed session token
    - ? Thumb only / the whole key
    - Store in trusted key chain #DB
  - Sign Msg
  - Sign & Encrypt Msg
2. #DB: [offline storage](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa)
  - [Cache API](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api) for resources necessary to load the app
  - [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for other data
3. QR Scanner: ✓
  - https://hackernoon.com/react-js-qr-code-scanner-with-webworker-in-background-7a8bcefd43d
  - https://stackoverflow.com/questions/52255929/progressive-web-app-pwa-qr-code-scanner
  - https://www.npmjs.com/package/react-qr-reader
4. Data Exchange
  - Key exchange
  - Key chain exchange
  - transmitting medium
    - [Bluetooth google documentation](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web)
    - [Bluetooth Medium](https://medium.com/@urish/start-building-with-web-bluetooth-and-progressive-web-apps-6534835959a6)
    - looping, multi-part QR Codes

5. GUI Tabs
  1. My keys
    - list secret keys
    - list trusts
  2. New Key
    - key generation 
    - key import
  3. Key signing
    - QR gen & scan
  4. Exhange keyring
    - multipart QR gen & scan
  5. verify stranger
    - QR gen & scan
  6. messaging 
    - sign only 
    - sign then encrypt

------------------------------------
 