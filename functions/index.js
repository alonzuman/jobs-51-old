const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

// Validate autocomplete names are correct with users collection
exports.onWriteUser = functions.firestore
  .document('users/{uid}')
  .onWrite(async (change, context) => {
    const fullNameBefore = `${change.before.data().firstName} ${change.before.data().lastName}`
    const fullNameAfter = `${change.after.data().firstName} ${change.after.data().lastName}`
    const constantsRef = admin.firestore().collection('constants')
    // const usersRef = admin.firestore().collection('users')

    try {
      // This is for updating all the memberNames incase of problem
      // let listedMembers = []
      // const usersSnap = await usersRef.get()
      // usersSnap.forEach(doc => listedMembers.push(`${doc.data().firstName} ${doc.data().lastName}`))
      // constantsRef.doc('listedMembers').set({
      //   all: listedMembers
      // })

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
