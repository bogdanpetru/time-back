# time back

## Introduction

Time back is a pomodoro like app but with strawberries.
Strawberries are custom intervals that can be grouped in projects.

The application has basic PWA functionality, it is installable and it caches statis assets.

This is a simple app that I have built for personal use.

## Getting started

Clone and install dependencies

```sh
git clone git@github.com:bogdanpetru/time-back.git
yarn
```

To play around with the code you need to create a firebase app, and create an `.env` file in `packages/web` with the following keys:

```
FIREBASE_API_KEY="<API-KEY>"
FIREBASE_AUTH_DOMAIN="<AUTH_DOMAIN>"
FIREBASE_DATABASE_URL="<DB_URL>"
FIREBASE_PROJECT_ID="<PROJECT_ID>"
FIREBASE_STORAGE_BUCKET="<STORAGE_BUCKET>"
FIREBASE_MESSAGING_SENDER_ID="<MESSAGING_SENDER_ID>"
FIREBASE_APP_ID="<APP_ID>"
FIREBASE_MEASUREMENT_ID="<MEASUREMENT_ID>"
```

### To run over https (to test PWA)

Start application with `yarn start:https`.

To generate a certificate follow steps from [here](https://web.dev/how-to-use-local-https/).

Generate the certificate under `packages/web` with `locahost` name.
`.pem` files are added to `.gitignore`.

If you want to generate the certificate in a another place, modify the `start:https` script from `packages/web` to point to the correct location.

## Technology Stack

ReactJs, react-router and styled-components for the UI.
Firebase for auth and data.
Most of the rest of the code-base is custom code.

## Structure

### Packages

- /common
  - /api - api calls and firebase setup (security rules and tests)
  - /assets - images, logo
  - /data - data management and mapping of entities
  - /components
  - /services - are stateful entities
  - /theme
  - /utils - are stateless utils
- /web
- /mobile (not yet implemented)

### Components

[structure](https://www.robinwieruch.de/react-folder-structure)

- component-name/
- /index.tsx
- /test.ts
- /style.js

### Web

#### /src/App.tsx

This component will hold all the logic that is common for all views:

- routing
- theming
- any global context providers

#### /src/components

Specific components for the web app.

##### Styled components

`styled-components` are first class components:

- we do not discriminate, the follow the same naming convention as any other component
- they are not segregated in `styled` folders

Naming:

- `Wrapper` - the out-most element, when one is needed
- `ComponentInner` - when the styled component represents the main part of the component
  - e.g. an Input component whould have an `InputInner` for the styled-input-componet

#### /views

- /views - each route of the app, hold view data
- /views/ViewName/
- /views/ViewName/index.ts
- /views/ViewName/ViewName.ts
- /views/ViewName/components/specific to the view?

## Style guide

### Principles

- easy to extend and refactor
- less code is better when it does not impact readability
  - e.g. all functions are declared with arrow function, shorter readability

#### Functions declarations

- use `() => {}` declaration for any function with the exception of generators
- `why`
  - everything is a variable
  - less code for simple components, no `return` statement
  - e.g. a styled-component when changing to proper component, less text to edit
  - forces to declare the functions in a certain order, you cannot use a function declared later

#### Exports

- one thing to export, default export
- multiple, always named, no namespaces
  - for multiple exports, always import under a namepsace using '\* as module'

#### Destructuring

- no destructuring for props
  - easy to see what are props or other types of variables

#### Booleans

- all booleans are prefixed with `is`
