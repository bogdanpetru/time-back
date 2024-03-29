**chores**

- [x] add data validation in firebase
- [x] add types to theme - will not do
- [x] add stats document
  - [x] number of projects
  - [x] key for each project with how many intervals it has
- [x] when pause is reset, it is changed to interval
- [x] clear data on logout

**todos**

- [x] basic input validation on project details
- [x] design a project card/list view
  - [x] needs to have all the information
  - [x] with a big play button

**UI**

- [x] focus first imput
- [x] save on enter

**before publish**

- [x] add firebase security rules
  - [x] unit tests
- [x] disable project
- [x] create new project (so the keys were not compromised)

**security settings**

- [x] restrict users to edit their own data
- [x] restrict the length of each value

**setup**

- [x] remove create react app

**faze I**

- [x] organize in projects
- [x] custom intervals
- [x] instalable app
- [x] sync with watchers
- [x] limit number of projects?
  - limiting the number of projects brings more reads and function invocation:
  - need to keep track of the number of projects (incremented by a cloud-function)
  - in security rules need to make an extra read for the tracking value
- [x] fix notification image
- [ ] fix background when installed on mobile
- [x] deploy on a custom domain

**faze II**

- [ ] allow using the app without logging in
  - [ ] save the data in indexdb or localstorage for web
- [ ] server side rendering
- [ ] able to use it as a fasting timer
- [ ] can add notes while the timer is running
  - [ ] define design

**faze III**

- [ ] tags
- [ ] all the data can be exported
- [ ] the data in the db is encrypted
- [ ] runs on mobile and web (web with PWA)
