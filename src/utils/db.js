import { db } from '../firebase'

const Users = db.collection('users')
const Activities = db.collection('activities')
const Constants = db.collection('constants')

export const getStats = async () => {
  let stats = {
    approvedActivityHoursByRegionCount: {},
    pendingActivityHoursByRegionCount: {},
    approvedActivityHoursCount: 0,
    pendingActivityHoursCount: 0,
    volunteersByRegionCount: 0,
    pendingUsersCount: 0,
    volunteersCount: 0
  };

  try {
    const volunteersSnap = await Users.where('volunteer', '==', true).get();
    const pendingUsers = await Users.where('role', '==', 'pending').get();
    const approvedActivitiesSnap = await Activities.where('approved', '==', true).get();
    const pendingActivitiesSnap = await Activities.where('approved', '==', false).get();

    volunteersSnap.forEach(doc => {
      const { region } = doc.data();
      if (region) {
        return stats = {
          volunteersByRegionCount: {
            ...stats.volunteersByRegionCount,
            [region]: (stats.volunteersByRegionCount[region] || 0) + 1
          }
        }
      }
    })

    approvedActivitiesSnap.forEach(doc => {
      const { total, region } = doc.data();
      return stats = {
        ...stats,
        approvedActivityHoursByRegionCount: {
          ...stats.approvedActivityHoursByRegionCount,
          [region]: (stats.approvedActivityHoursByRegionCount[region] ? stats.approvedActivityHoursByRegionCount[region] : 0) + total,
        },
        approvedActivityHoursCount: (stats.approvedActivityHoursCount || 0) + total
      }
    })

    pendingActivitiesSnap.forEach(doc => {
      const { total, region } = doc.data();
      return stats = {
        ...stats,
        pendingActivityHoursByRegionCount: {
          ...stats.pendingActivityHoursByRegionCount,
          [region]: (stats.pendingActivityHoursByRegionCount[region] || 0) + total
        },
        pendingActivityHoursCount: stats.pendingActivityHoursCount + total
      }
    })

    stats = {
      ...stats,
      volunteersCount: volunteersSnap.size,
      pendingUsersCount: pendingUsers.size
    }

    console.log(stats)

  } catch (error) {
    console.log(error)
  }
}

// export const seed = async () => {
//   // Map all pending users
//   const pendingUsersSnap = await Users.where('role', '==', 'pending').get()
//   const pendingUsersCount = pendingUsersSnap.size


//   // Map all volunteers by regions and general
//   const volunteersSnap = await Users.where('volunteer', '==', true).get()
//   let volunteersCount = volunteersSnap.size
//   let volunteersByRegionCount = {}

//   await volunteersSnap.forEach(doc => {
//     const { region } = doc.data();

//     const oldVal = volunteersByRegionCount[region] || 0;

//     volunteersByRegionCount = {
//       ...volunteersByRegionCount,
//       [region || 'ללא']: oldVal + 1
//     }
//   })


//   // Map all the approved activities hours
//   const approvedActivitiesSnap = await Activities.where('approved', '==', true).get()
//   let approvedActivityHoursCount = 0;
//   let approvedActivityHoursByRegionCount = {};

//   await approvedActivitiesSnap.forEach(doc => {
//     const { total, region } = doc.data()

//     const oldVal = approvedActivityHoursByRegionCount[region] || 0;
//     const newVal = total;

//     approvedActivityHoursCount += total;
//     approvedActivityHoursByRegionCount = {
//       ...approvedActivityHoursByRegionCount,
//       [region]: oldVal + newVal
//     }
//   })

//   const stats = {
//     pendingUsersCount,
//     volunteersCount,
//     approvedActivityHoursCount,
//     volunteersByRegionCount,
//     approvedActivityHoursByRegionCount,
//   }

//   console.log(stats)
//   await Constants.doc('stats').set({
//     ...stats
//   }, { merge: true })
// }
