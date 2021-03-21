const functions = require('firebase-functions')

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin')
admin.initializeApp()

const firestore = (exports.limitNumberOfProjects = functions.firestore
  .document('/users/{userId}/projects/{projectId}')
  .onCreate(async (_: any, context: any) => {
    functions.logger.log('increasing project count', context.params.projectId)

    const userDocRef = admin
      .firestore()
      .collection('users')
      .doc(context.params.userId)
    try {
      await userDocRef.update({
        numberOfProjects: admin.firestore.FieldValue.increment(1),
      })
    } catch (error) {
      functions.logger.error(
        `Failed to update user data while trying to update number of projects for: ${context.params.userId}`,
        error
      )
    }

    return Promise.resolve(null)
  }))
