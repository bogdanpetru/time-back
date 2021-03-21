const functions = require('firebase-functions')

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin')
admin.initializeApp()

exports.limitNumberOfProjects = functions.functions.firestore
  .document('/users/{userId}/projects/{projectId}')
  .onCreate((snap: any, context: any) => {
    const original = snap.data().original

    functions.logger.log(
      'increasing project count',
      context.params.projectId,
      original
    )

    return Promise.resolve(null)
  })
