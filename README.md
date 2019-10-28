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


------------------------------------
React generated README below

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
