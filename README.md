# time back

## should be abble to

**chores**

- [-] add webpack alias for providers
  - [ ] not sure this is needed because anything I would want to import should bee already a child, or it should reside ini @app/common
- [x] think about providers vs importing services directly
- [ ] add eslint and prettier in webpack
- [ ] move tsconfig to root, so all projects can use the same config
- [ ] clean up 
- [ ] move useForm outside and add generics

**todos**

- [ ] basic input validation on project details
- [ ] design a project card/list view
  - [ ] needs to have all the information
  - [ ] with a big play button

**before publish**
- [ ] add firebase security rules
- [ ] disable project
- [ ] create new project (so the keys were not compromised)

**security settings**

- [ ] restrict users to edit their own data
- [ ] restrict to a maximum of projects
- [ ] restrict the length of each value
- [ ] add validation in a cloud function
- [ ] sanity - restrict the number of writes/reads/day

**setup**
- [x] remove create react app

**faze I**
- [ ] organize in projects
- [ ] custom intervals
- [ ] notes on pomodoros and projects
- [ ] can add notes while the timer is running
- [ ] able to use it as a fasting timer

**faze II**
- [ ] allow using the app without logging in
  - [ ] save the data in indexdb or localstorage for web\
- [ ] logged in with faundadb
- [ ] require stronger password
- [ ] server side rendering

**faze III**
- [ ] tags
- [ ] all the data can be exported
- [ ] the data in the db is encrypted
- [ ] runs on mobile and web (web with PWA)


## structure

### packages

common
  /components
  /data
    /api
      /service - are stateful entities
      /utils - are stateless utils
web
mobile

### components


[structure](https://www.robinwieruch.de/react-folder-structure)

component-name/
  /index.tsx 
  /test.ts
  /style.js

### web

#### /src/App.tsx

This component will hold all the logic that is common for all views:
- routing
- theming
- any global context providers
#### /components

/components - specific components for the web

#### styled components

`styled-components` are first class components:
  -  we do not discriminate, the follow the same naming convention as any other component 
  -  they are not segregated in `styled` folders

Naming:
- `Wrapper` - the out-most element, when one is needed
- `ComponentInner` - when the styled component represents the main part of the component
  - e.g. an Input component whould have an `InputInner` for the styled-input-componet
#### /views

/views - each route of the app, hold view data
/views/ViewName/
/views/ViewName/index.ts
/views/ViewName/ViewName.ts
/views/ViewName/components/specific to the view?

## style guide

### Principles

- easy to extend and refactor
- less code is better when it does not impact readability
  - e.g. all functions are declared with arrow function, shorter readability
#### functions declarations
- use `() => {}` declaration for any function with the exception of generators
- `why` 
  -  everything is a variable
  -  less code for simple components, no `return` statement
  -  e.g. a styled-component when changing to proper component, less text to edit
#### exports
- one thing to export, default export
- multiple, always named, no namespaces

#### destructuring
- no destructuring for props
  - easy to see what are props or other types of variables

####
- all booleans are prefixed with `is`


## Stack

### build/dev

The app uses vanilla **webpack**. I've tired to  use parcel and create-react-app.

Both alternatives (I create-react-app uses webpack) were hard to work with with typescript, yarn packages, web and react-native.
