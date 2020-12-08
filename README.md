# time back

## should be abble to

**setup**
- [ ] remove create react app

**faze I**
- [ ] organise in projects
- [ ] custo intervals
- [ ] notes on pomodoros and projects
- [ ] can add notes while the timer is running
- [ ] able to use it as a fasting timer

**faze II**
- [ ] allow using the app without logging in
  - [ ] save the data in indexdb or localstorage for web
- [ ] logged in with faundadb

**faze III**
- [ ] tags
- [ ] all the data can be exported
- [ ] the data in the db is encrypted
- [ ] runs on mobile and web (web with PWA)


## structure

## packages

common
  /components
  /services
    /api
web
mobile

## components


[structure](https://www.robinwieruch.de/react-folder-structure)

component-name/
  /index.tsx 
  /test.ts
  /style.js

## web

### /src/App.tsx

This component will hold all the logic that is common for all views:
- ruting
- theminig
- any global context providers

### comoponents

/components - specific components for the web

##### views

/views - each route of the app, hold view data

/views/ViewName/
/views/ViewName/index.ts
/views/ViewName/ViewName.ts
/views/ViewName/components/specific to the view?

## style guide

### destructuring
- as mutch as possible no destructuring
- this way you have the notion of namespace