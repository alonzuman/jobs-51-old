const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const faker = require('faker');
admin.initializeApp()

const Constants = admin.firestore().collection('constants');
const Users = admin.firestore().collection('users');
const Activities = admin.firestore().collection('activities');
const Saved = admin.firestore().collection('saved');
const Jobs = admin.firestore().collection('jobs');
const Notifications = admin.firestore().collection('notifications');

// SEED
// exports.onSeed = functions.firestore
//   .document('seed/{seedId}')
//   .onWrite(async (change, context) => {
//     try {

//       // Seed users
//       const user = {
//         region: 'חיפה',
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         avatar: faker.image.avatar(),
//         email: faker.internet.email(),
//         activities: {
//           pending: 0,
//           approved: 0
//         }
//       }
//       const userRef = await Users.add(user)
//       const uid = userRef.id;

//       // Seed constants
//       await Constants.doc('listedMembers').set({
//         all: admin.firestore.FieldValue.arrayUnion(`${user.firstName} ${user.lastName}`)
//       })

//       // Seed jobs
//       await Jobs.add({
//         company: faker.company.companyName(),
//         email: faker.internet.email(),
//         jobTitle: faker.name.jobTitle(),
//         location: faker.address.city(),
//         phone: faker.phone.phoneNumber(),
//         uid,
//         skills: [faker.name.jobType(), faker.name.jobType(), faker.name.jobType()],
//         user: {
//           avatar: user.avatar,
//           firstname: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//         }
//       })

//       await Jobs.add({
//         company: faker.company.companyName(),
//         email: faker.internet.email(),
//         jobTitle: faker.name.jobTitle(),
//         location: faker.address.city(),
//         phone: faker.phone.phoneNumber(),
//         uid,
//         skills: [faker.name.jobType(), faker.name.jobType(), faker.name.jobType()],
//         user: {
//           avatar: user.avatar,
//           firstname: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//         }
//       })

//       // Seed activities
//       await Activities.add({
//         region: 'חיפה',
//         uid,
//         user: {
//           firstName: user.firstName,
//           lastName: user.lastName,
//           avatar: user.avatar,
//           region: user.region
//         },
//         description: faker.lorem.sentence(),
//         type: 'אירוע שיא',
//         approved: false,
//         total: faker.random.number({ min: 2, max: 12 })
//       })

//       await Activities.add({
//         region: 'חיפה',
//         uid,
//         user: {
//           firstName: user.firstName,
//           lastName: user.lastName,
//           avatar: user.avatar,
//           region: user.region
//         },
//         description: faker.lorem.sentence(),
//         type: 'אירוע שיא',
//         approved: false,
//         total: faker.random.number({ min: 2, max: 12 })
//       })

//     } catch (error) {
//       console.log('#########################')
//       console.log('######### ERROR #########')
//       console.log('#########################')
//       console.log(error)
//     }
//   })


// USERS
exports.onCreateUser = functions.firestore
  .document('users/{uid}')
  .onCreate(async (snapshot, context) => {
    const fullName = `${snapshot.data().firstName} ${snapshot.data().lastName}`
    try {
      await Constants.doc('listedMembers').update({
        all: admin.firestore.FieldValue.arrayUnion(fullName)
      })
    } catch (error) {
      console.log('################')
      console.log('################')
      console.log('################')
      console.log(error)
    }
  })

exports.onUpdateUser = functions.firestore
  .document('users/{uid}')
  .onUpdate(async (change, context) => {
    const uid = context.params.uid;
    try {
      if (change.before.exists && change.after.exists) {
        const { firstName: firstNameBefore, lastName: lastNameBefore } = change.before.data();
        const { firstName: firstNameAfter, lastName: lastNameAfter, avatar: avatarAfter } = change.after.data();

        const fullNameBefore = `${firstNameBefore} ${lastNameBefore}`;
        const fullNameAfter = `${firstNameAfter} ${lastNameAfter}`;

        if (fullNameAfter !== fullNameBefore) {
          // Update users on listedMembers list
          await Constants.doc('listedMembers').update({
            all: admin.firestore.FieldValue.arrayRemove(fullNameBefore)
          })
          await Constants.doc('listedMembers').update({
            all: admin.firestore.FieldValue.arrayUnion(fullNameAfter)
          })

          // Update all activities user has
          const activitiesSnapshot = await Activities.where('uid', '==', uid).get();
          activitiesSnapshot.forEach(async doc => {
            await Activities.doc(doc.id).set({
              user: {
                firstName: firstNameAfter,
                lastName: lastNameAfter,
                avatar: avatarAfter
              }
            }, { merge: true })
          })

          // Update all job posts user has
          const jobsSnapshot = await Jobs.where('uid', '==', uid).get();
          jobsSnapshot.forEach(async doc => {
            await Jobs.doc(doc.id).set({
              user: {
                firstName: firstNameAfter,
                lastName: lastNameAfter,
                avatar: avatarAfter
              }
            }, { merge: true })
          })
        }
      }
    } catch (error) {
      console.log('################')
      console.log('################')
      console.log('################')
      console.log(error)
    }
  })

exports.onDeleteUser = functions.firestore
  .document('users/{uid}')
  .onDelete(async (snapshot, context) => {
    const { uid } = context.params;
    const { firstName, lastName } = snapshot.data()
    const fullName = `${firstName} ${lastName}`
    try {
      // Delete user from listedMembers
      await Constants.doc('listedMembers').update({
        all: admin.firestore.FieldValue.arrayRemove(fullName)
      })

      // Delete job posts
      const jobsSnapshot = await Jobs.where('uid', '==', uid).get()
      jobsSnapshot.forEach(async doc => {
        await Jobs.doc(doc.id).delete()
      })

      // Delete saved
      const savedSnapshot = await Saved.where('uid', '==', uid).get()
      savedSnapshot.forEach(async doc => {
        await Saved.doc(doc.id).delete()
      })

      // Delete activities
      const activitiesSnapshot = await Activities.where('uid', '==', uid).get()
      activitiesSnapshot.forEach(async doc => {
        await Activities.doc(doc.id).delete()
      })
    } catch (error) {
      console.log('##################')
      console.log('##################')
      console.log('##################')
      console.log(error)
    }
  })

// ACTIVITIES
exports.onCreateActivity = functions.firestore
  .document('activities/{activityId}')
  .onCreate(async (snapshot, context) => {
    const { uid, total, approved } = snapshot.data()
    const userRef = Users.doc(uid);
    const increment = admin.firestore.FieldValue.increment(total);
    try {
      if (approved) {
        await userRef.update('activities.approved', increment)
      } else {
        await userRef.update('activities.pending', increment)
      }
    } catch (error) {
      console.log('#############')
      console.log('#############')
      console.log('#############')
      console.log(error)
    }
  })

exports.onUpdateActivity = functions.firestore
  .document('activities/{activityId}')
  .onUpdate(async (change, context) => {
    const { activityId } = context.params;
    const { approved: approvedBefore } = change.before.data();
    const { uid, approved: approvedAfter, total } = change.after.data();
    try {
      const increment = admin.firestore.FieldValue.increment(total)
      const decrement = admin.firestore.FieldValue.increment(-total)

      if (approvedBefore !== approvedAfter && change.before.exists) {
        if (approvedAfter) {
          await Notifications.add({
            uid,
            activityId,
            msg: 'activityApproved'
          })
        }
        return await Users.doc(uid).set({
          activities: {
            approved: approvedAfter ? increment : decrement,
            pending: approvedAfter ? decrement : increment
          }
        }, { merge: true })
      }
    } catch (error) {
      console.log('###############')
      console.log('###############')
      console.log('###############')
      console.log(error)
    }
  })

exports.onDeleteActivity = functions.firestore
  .document('activities/{activityId}')
  .onDelete(async (snapshot, context) => {
    const { uid, total, approved } = snapshot.data()
    try {
      const decrement = admin.firestore.FieldValue.increment(-total);
      const activities = approved ? { approved: decrement } : { pending: decrement }

      await Users.doc(uid).set({
        activities
      }, { merge: true })
    } catch (error) {
      console.log('###############')
      console.log('###############')
      console.log('###############')
      console.log(error)
    }
  })

// JOBS
exports.onCreateJob = functions.firestore
  .document('jobs/{jobId}')
  .onCreate(async (snapshot, context) => {
    const { jobId } = context.params;
    const { skills, location } = snapshot.data()
    try {
      const increment = admin.firestore.FieldValue.increment(1)

      // Update job locations count
      await Constants.doc('listedJobLocations').set({
        [location]: increment
      }, { merge: true })

      // Update job skills count
      await skills.forEach(async skill => {
        await Constants.doc('listedJobSkills').update({
          [skill]: increment
        })
      })
    } catch (error) {
      console.log('###############')
      console.log('###############')
      console.log('###############')
      console.log(error)
    }
  })

exports.onUpdateJob = functions.firestore
  .document('jobs/{jobId}')
  .onUpdate(async (change, context) => {
    try {
      if (change.after.exists) {
        const { location: locationBefore, skills: skillsBefore } = change.before.data();
        const { location: locationAfter, skills: skillsAfter } = change.after.data();

        const increment = admin.firestore.FieldValue.increment(1);
        const decrement = admin.firestore.FieldValue.increment(-1);

        if (locationAfter !== locationBefore) {
          await Constants.doc('listedJobLocations').set({
            [locationBefore]: decrement,
            [locationAfter]: increment
          }, { merge: true })
        }

        if (skillsBefore !== skillsAfter) {
          await skillsBefore.forEach(async skill => {
            await Constants.doc('listedJobSkills').update({
              [skill]: decrement
            })
          })

          await skillsAfter.forEach(async skill => {
            await Constants.doc('listedJobSkills').update({
              [skill]: increment
            })
          })
        }
      }
    } catch (error) {
      console.log('###############')
      console.log('###############')
      console.log('###############')
      console.log(error)
    }
  })

exports.onDeleteJob = functions.firestore
  .document('jobs/{jobId}')
  .onDelete(async (snapshot, context) => {
    const { location, skills } = snapshot.data()
    try {
      const decrement = admin.firestore.FieldValue.increment(-1)

      // Update locations count
      await Constants.doc('listedJobLocations').set({
        [location]: decrement
      }, { merge: true })

      // Update skills count
      await skills.forEach(async skill => {
        await Constants.doc('listedJobSkills').update({
          [skill]: decrement
        })
      })
    } catch (error) {
      console.log('###############')
      console.log('###############')
      console.log('###############')
      console.log(error)
    }
  })
