import {
  initializeTestApp,
  assertSucceeds,
  assertFails,
  clearFirestoreData,
  initializeAdminApp,
} from '@firebase/rules-unit-testing'

const PROJECT_ID = 'pomodoro-like-app'
const userId = 'some-id'
const db = initializeTestApp({
  projectId: PROJECT_ID,
  auth: {
    uid: userId,
  },
}).firestore()

const dbAdmin = initializeAdminApp({
  projectId: PROJECT_ID,
}).firestore()

const getProjectsDoc = () =>
  db.collection('users').doc(userId).collection('projects')

const addDummyProject = () =>
  dbAdmin
    .collection('users')
    .doc(userId)
    .collection('projects')
    .doc('project-id')
    .set({
      name: 'old project',
      strawberrySize: 20,
      numberOfStrawberries: 30,
      breakSize: 30,
      description: 'old project description',
    })

afterAll(async () => {
  await clearFirestoreData({
    projectId: PROJECT_ID,
  })
})
beforeEach(async () => {
  // await clearFirestoreData({
  //   projectId: PROJECT_ID,
  // })
})

describe('api', () => {
  it('Can read from own collection', async () => {
    await assertSucceeds(getProjectsDoc().doc('some-project').get())
  })

  it("Can't read from outside projects collection", async () => {
    await assertFails(db.collection('not-projects').get())
    await assertFails(
      db.collection('users').doc(userId).collection('not-projects').get()
    )
  })
  it.each([
    ['name', 'str-value', 3],
    ['strawberrySize', 3, 'string'],
    ['breakSize', 3, 'string'],
    ['description', 'string', 3],
  ])('Can set %s as %s but not as %s', async (name, value, nonValidType) => {
    await addDummyProject()

    await assertSucceeds(
      getProjectsDoc()
        .doc('project-id')
        .update({
          [name]: value,
        })
    )
    await assertFails(
      getProjectsDoc()
        .doc('project-id')
        .update({
          [name]: nonValidType,
        })
    )
  })

  it("Can't update project-non-valid properties", async () => {
    await addDummyProject()
    await assertFails(
      getProjectsDoc().doc('project-id').update({
        doesNotExist: 'no-valid-value',
      })
    )
  })

  it('Can create project without optional fields', async () => {
    await assertSucceeds(
      getProjectsDoc().doc().set({
        name: 'string',
        strawberrySize: 0,
        breakSize: 0,
        description: 'description',
      })
    )
  })

  it("Can't create project with invalid fields", async () => {
    await assertFails(
      getProjectsDoc().doc().set({
        name: 'cool project',
        customProp: 'not-a-valid-prop',
      })
    )
  })
})
