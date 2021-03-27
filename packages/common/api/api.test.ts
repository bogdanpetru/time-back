import {
  initializeTestApp,
  assertSucceeds,
  assertFails,
  clearFirestoreData,
  initializeAdminApp,
} from '@firebase/rules-unit-testing'

const PROJECT_ID = 'time-back-2c1a5'
const userId = 'user-id'
const projectId = 'project-id'
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
    .doc(projectId)
    .set({
      name: 'old project',
      strawberrySize: 20,
      numberOfStrawberries: 30,
      breakSize: 30,
      description: 'old project description',
      statistics: {},
    })

const createUser = () =>
  dbAdmin.collection('users').doc(userId).set({ numberOfProjects: 5 })

afterAll(async () => {
  await clearFirestoreData({
    projectId: PROJECT_ID,
  })
})

beforeEach(async () => {
  await createUser()
})

afterEach(async () => {
  await clearFirestoreData({
    projectId: PROJECT_ID,
  })
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
        .doc(projectId)
        .update({
          [name]: value,
        })
    )
    await assertFails(
      getProjectsDoc()
        .doc(projectId)
        .update({
          [name]: nonValidType,
        })
    )
  })

  it("Can't update project-non-valid properties", async () => {
    await addDummyProject()
    await assertFails(
      getProjectsDoc().doc(projectId).update({
        doesNotExist: 'no-valid-value',
      })
    )
  })

  it('Can create project without optional fields', async () => {
    await assertSucceeds(
      getProjectsDoc().doc().set({
        name: 'string',
        strawberrySize: 1,
        numberOfStrawberries: 1,
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

  it('Can create a project with a current straberry', async () => {
    await assertSucceeds(
      getProjectsDoc()
        .doc()
        .set({
          name: 'cool project',
          strawberrySize: 20,
          numberOfStrawberries: 1,
          currentStrawberry: {
            size: 20,
            timeSpent: [],
            startTime: [],
            running: false,
            type: 'STRAWBERRY_TYPE_PAUSE',
          },
        })
    )
  })

  it("Can't create a project with an invalid currentStrawberry", async () => {
    await assertFails(
      getProjectsDoc()
        .doc()
        .set({
          name: 'cool project',
          strawberrySize: 20,
          currentStrawberry: {
            notAValidValue: 20,
            size: 20,
            timeSpent: [],
            startTime: [],
            running: false,
            type: 'STRAWBERRY_TYPE_PAUSE',
          },
        })
    )
  })

  it.each([
    ['size', 3, 'must-be-number'],
    ['timeSpent', [2], 'must-be-array'],
    ['timeSpent', [], 'can be empty'],
    ['startTime', [1], 'must be array'],
    ['startTime', [], 'can be empty'],
    ['running', true, 'must be bool'],
    ['type', 'STRAWBERRY_TYPE_INTERVAL', 'invalid type'],
    ['type', 'STRAWBERRY_TYPE_PAUSE', 'invalid type'],
  ])(
    'Can create project with current strawberry with %s as %s but not as %s',
    async (name, value, nonValidType) => {
      await addDummyProject()
      await assertSucceeds(
        getProjectsDoc()
          .doc(projectId)
          .update({
            currentStrawberry: {
              [name]: value,
            },
          })
      )

      await assertFails(
        getProjectsDoc()
          .doc(projectId)
          .update({
            currentStrawberry: {
              [name]: nonValidType,
            },
          })
      )
    }
  )

  it('Can stop a running strawberry', async () => {
    await addDummyProject()
    await assertSucceeds(
      getProjectsDoc()
        .doc(projectId)
        .update({
          currentStrawberry: {
            size: 3000,
            timeSpent: [],
            startTime: [1615875356000],
            running: false,
            type: 'STRAWBERRY_TYPE_INTERVAL',
          },
        })
    )
  })

  it('Can archive a valid strawberry', async () => {
    await assertSucceeds(
      getProjectsDoc().doc(projectId).collection('strawberries').doc().set({
        size: 20,
        timeSpent: [],
        startTime: [],
        running: false,
        type: 'STRAWBERRY_TYPE_PAUSE',
      })
    )
  })
  it("Can't archive an invalid strawberry", async () => {
    await assertFails(
      getProjectsDoc().doc(projectId).collection('strawberries').doc().set({
        size: 'not-a-valid-size',
        timeSpent: [],
        startTime: [],
        running: false,
        type: 'STRAWBERRY_TYPE_PAUSE',
      })
    )
  })
  it('Can delete own project', async () => {
    await assertSucceeds(getProjectsDoc().doc(projectId).delete())
  })

  it('Can save statistics on project', async () => {
    await addDummyProject()
    await assertSucceeds(
      getProjectsDoc()
        .doc(projectId)
        .update({
          statistics: {
            today: {
              date: 1616007083012,
              completedStrawberries: 10,
            },
            totalStrawberries: 10,
            currentStreak: 0,
            numberOfDailyCompletedGoals: 0,
          },
        })
    )
  })

  it("Can't update statistics with non-valid keys", async () => {
    await addDummyProject()
    await assertFails(
      getProjectsDoc()
        .doc(projectId)
        .update({
          statistics: {
            today: {
              date: 1616007083012,
              completedStrawberries: 10,
            },
            totalStrawberries: 10,
            currentStreak: 0,
            notAvalidKey: 0,
          },
        })
    )
  })

  it("Can't update statistics with non-valid keys in statistics.today", async () => {
    await addDummyProject()
    await assertFails(
      getProjectsDoc()
        .doc(projectId)
        .update({
          statistics: {
            today: {
              date: 1616007083012,
              completedStrawberries: 10,
              notAvalidKey: 0,
            },
            totalStrawberries: 10,
            currentStreak: 0,
          },
        })
    )
  })

  it.each([
    [
      'today.date',
      { today: { date: 1616007083012 } },
      { today: { date: 'invalid' } },
    ],
    [
      'today.completedStrawberries',
      { today: { completedStrawberries: 1 } },
      { today: { completedStrawberries: 'invalid' } },
    ],
    [
      'totalStrawberries',
      { totalStrawberries: 1 },
      { totalStrawberries: 'not-valid-type' },
    ],
    [
      'currentStreak',
      { currentStreak: 1 },
      { currentStreak: 'not-valid-type' },
    ],
  ])(
    'Can update %s with valid value, but not with invalid',
    async (_, validUpdate, invalidValue) => {
      await addDummyProject()
      await assertSucceeds(
        getProjectsDoc().doc(projectId).update({
          statistics: validUpdate,
        })
      )
      await assertFails(
        getProjectsDoc().doc(projectId).update({
          statistics: invalidValue,
        })
      )
    }
  )
})
