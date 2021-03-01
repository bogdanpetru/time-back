import {
  initializeTestApp,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing'

const appId = 'pomodoro-like-app'

describe('api', () => {
  const userId = 'some-id'
  const db = initializeTestApp({
    projectId: appId,
    auth: {
      uid: userId,
    },
  }).firestore()

  const getProjectsDoc = () =>
    db.collection('users').doc(userId).collection('projects')

  it('Can read from own collection', async () => {
    await assertSucceeds(getProjectsDoc().doc('some-project').get())
  })

  it("Can't read from outside projects collection", async () => {
    await assertFails(db.collection('not-projects').get())
    await assertFails(
      db.collection('users').doc(userId).collection('not-projects').get()
    )
  })

  it('project has a `name` string property', async () => {
    await assertSucceeds(
      getProjectsDoc().doc('project-id').set({
        name: 'string',
      })
    )

    // await assertFails(
    //   getProjectsDoc().doc('project-id').set({
    //     name: 23,
    //   })
  })
})
