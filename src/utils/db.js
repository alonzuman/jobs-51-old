import { db } from '../firebase'

const Users = db.collection('users')
const Activities = db.collection('activities')
const Constants = db.collection('constants')

// export const fixStats = async () => {
//   let stats = {
//     approvedActivityHoursByRegionCount: {},
//     pendingActivityHoursByRegionCount: {},
//     volunteersByRegionCount: {},
//     approvedActivityHoursCount: 0,
//     pendingActivityHoursCount: 0,
//     pendingUsersCount: 0,
//     volunteersCount: 0
//   };

//   let unmarkedActivities = [];
//   let unmarkedUsers = [];

//   try {
//     const allUsers = await Users.limit(5).get()
//     // const allUsers = await Users.get()
//     const allActivities = await Activities.limit(5).get()
//     // const allActivities = await Activities.get()

//     // Fix stats activities count
//     allActivities.forEach(doc => {
//       const { approved, total, region } = doc.data();

//       if (region === '') {
//         unmarkedActivities.push({
//           id: doc.id,
//           ...doc.data()
//         })
//       } else if (approved && region) {
//         stats = {
//           ...stats,
//           approvedActivityHoursCount: stats.approvedActivityHoursCount + total,
//           approvedActivityHoursByRegionCount: {
//             ...stats.approvedActivityHoursByRegionCount,
//             [region]: (stats.approvedActivityHoursByRegionCount[region] || 0) + total
//           }
//         }
//       } else {
//         stats = {
//           ...stats,
//           pendingActivityHoursCount: stats.pendingActivityHoursCount + total,
//           pendingActivityHoursByRegionCount: {
//             ...stats.pendingActivityHoursByRegionCount,
//             [region]: (stats.pendingActivityHoursByRegionCount[region] || 0) + total
//           }
//         }
//       }
//     })

//     // Fix stats users count
//     allUsers.forEach(doc => {
//       const { role, volunteer, region } = doc.data();

//       if (region && role !== 0 && volunteer) {
//         stats = {
//           ...stats,
//           volunteersCount: stats.volunteersCount + 1,
//           volunteersByRegionCount: {
//             ...stats.volunteersByRegionCount,
//             [region]: (stats.volunteersByRegionCount[region] || 0) + 1
//           }
//         }
//       } else if (role === 0) {
//         stats = {
//           ...stats,
//           pendingUsersCount: stats.pendingUsersCount + 1,
//         }
//       } else {
//         unmarkedUsers.push({
//           id: doc.id,
//           ...doc.data()
//         })
//       }
//     })

//     await Constants.doc('stats').set({
//       ...stats
//     }, { merge: true })

//     await Constants.doc('problematicDocs').set({
//       unmarkedUsers,
//       unmarkedActivities
//     }, { merge: true })

//     console.log('unmarkedUsers: ', unmarkedUsers)
//     console.log('unmarkedActivities: ', unmarkedActivities)
//     console.log(stats)
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const fixUserActivityHoursCount = async () => {
//   try {
//     // const allUsers = await Users.get();
//     const allUsers = await Users.limit(50).get();
//     const promises = allUsers.forEach(doc => {
//       const uid = doc.id;
//       const user = doc.data();
//       let activities = {
//         approved: 0,
//         pending: 0
//       }
//       Activities.where('uid', '==', uid).get().then(snapshot => {
//         snapshot.forEach(userActivity => {
//           const { approved, total } = userActivity.data();
//           activities = {
//             approved: approved ? activities.approved + total : activities.approved,
//             pending: !approved ? activities.pending + total : activities.pending,
//           }
//         })
//       }).then(() => {
//         // console.log(`${uid}: `, user)
//         // console.log('oldActivities: ', user.activities)
//         // console.log('activities:', activities)
//         Users.doc(uid).set({
//           activities
//         }, { merge: true })
//       })
//     })

//     await Promise.all(promises)
//   } catch (error) {
//     console.log(error)
//   }
// }
