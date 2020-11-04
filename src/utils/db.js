// import { db } from '../firebase'

// const Users = db.collection('users')
// const Activities = db.collection('activities')
// const Constants = db.collection('constants')

// export const seedStats = async () => {
//   const usersSnap = await Users.get()
//   console.log(usersSnap.size)
//   // return seed()
// }

// export const seed = async () => {
//   // Map all pending users
//   const pendingUsersSnap = await Users.where('role', '==', 'pending').get()
//   const pendingUsersCount = pendingUsersSnap.size


//   // Map all volunteers by regions and general
//   const volunteersSnap = await Users.where('volunteer', '==', true).get()
//   let volunteersCount = volunteersSnap.size
//   let volunteersByRegionCount = {}

//   volunteersSnap.forEach(doc => {
//     const { region } = doc.data();

//     const oldVal = volunteersByRegionCount[region] || 0;

//     volunteersByRegionCount = {
//       ...volunteersByRegionCount,
//       [region]: oldVal + 1
//     }
//   })


//   // Map all the approved activities hours
//   const approvedActivitiesSnap = await Activities.where('approved', '==', true).get()
//   let approvedActivityHoursCount = 0;
//   let approvedActivityHoursByRegionCount = {};

//   approvedActivitiesSnap.forEach(doc => {
//     const { total, region } = doc.data()

//     const oldVal = approvedActivityHoursByRegionCount[region] || 0;
//     const newVal = total;

//     approvedActivityHoursCount += total;
//     approvedActivityHoursByRegionCount = {
//       ...approvedActivityHoursByRegionCount,
//       [region]: oldVal + newVal
//     }
//   })

//   let stats = {
//     pendingUsersCount,
//     volunteersCount,
//     approvedActivityHoursCount,
//     volunteersByRegionCount,
//     approvedActivityHoursByRegionCount,
//   }

//   const statsRef = Constants.doc('stats');
//   await statsRef.set({
//     ...stats
//   }, { merge: true })
// }
