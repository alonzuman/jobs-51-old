const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onWriteUser = functions.firestore
  .document('users/{uid}')
  .onWrite(async (change, context) => {
    const fullNameBefore = `${change.before.data().firstName} ${change.before.data().lastName}`
    const fullNameAfter = `${change.after.data().firstName} ${change.after.data().lastName}`
    const constantsRef = admin.firestore().collection('constants')

    try {
      await constantsRef.doc('listedMembers').update({
        all: admin.firestore.FieldValue.arrayRemove(fullNameBefore)
      })

      await constantsRef.doc('listedMembers').update({
        all: admin.firestore.FieldValue.arrayUnion(fullNameAfter)
      })
    } catch (error) {
      console.log('#########################')
      console.log('######### ERROR #########')
      console.log('#########################')
      console.log(error)
    }
  })
