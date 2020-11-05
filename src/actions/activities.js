import { db } from '../firebase'
import { setFeedback } from './feedback'
import { ADD_ACTIVITY, DELETE_ACTIVITY, ERROR, FETCHING_ACTIVITIES, FETCHING_MORE_ACTIVITIES, FETCHING_REGION, SET_ACTIVITIES, SET_MORE_ACTIVITIES, SET_REGION, UPDATING } from '../reducers/activities'
import store from '../store'
import { SET_USER } from '../reducers/auth'
import qs from 'query-string'
const { translation } = store.getState().theme
const Activities = db.collection('activities')
const Users = db.collection('users')

export const addActivity = (activity) => async dispatch => {
  const { uid, activities } = store.getState().auth
  dispatch({
    type: UPDATING
  })
  try {
    const activityRef = Activities.doc()
    const newActivity = {
      ...activity,
      id: activityRef.id,
      uid,
      dateCreated: Date.now()
    }
    const { total } = activity
    await Activities.doc(activityRef.id).set(newActivity)
    dispatch({
      type: ADD_ACTIVITY,
      payload: {
        ...newActivity
      }
    })
    dispatch({
      type: SET_USER,
      payload: {
        activities: {
          pending: activities.pending + total,
          approved: activities.approved
        }
      }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: translation.activityAdded
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const getUserActivities = (uid) => async dispatch => {
  dispatch({
    type: FETCHING_ACTIVITIES
  })

  try {
    const activitiesSnapshot = await Activities.where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    let all = []
    activitiesSnapshot.forEach(doc => all.push({ id: doc.id, ...doc.data() }))

    dispatch({
      type: SET_ACTIVITIES,
      payload: {
        all,
        currentUid: uid
      }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR
    })
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const approveActivity = (activity, admin) => async dispatch => {
  try {
    const authState = store.getState().auth
    const { id, total, uid } = activity
    await Activities.doc(id).set({
      approved: true,
      approvedBy: {
        ...admin
      }
    }, { merge: true })

    if (authState.uid === uid) {
      dispatch({
        type: SET_USER,
        payload: {
          activities: {
            pending: authState.activities.pending - total,
            approved: authState.activities.approved + total
          }
        }
      })
    }

    dispatch(setFeedback({
      type: 'success',
      msg: translation.activityApproved
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const unApproveActivity = (activity, admin) => async dispatch => {
  try {
    const authState = store.getState().auth
    const { id, total, uid } = activity
    await Activities.doc(id).set({
      approved: false,
      approvedBy: {
        ...admin
      }
    }, { merge: true })

    if (authState.uid === uid) {
      dispatch({
        type: SET_USER,
        payload: {
          activities: {
            pending: authState.activities.pending + total,
            approved: authState.activities.approved - total
          }
        }
      })
    }

    dispatch(setFeedback({
      type: 'success',
      msg: translation.activityUnapproved
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const deleteActivity = (activity) => async dispatch => {
  dispatch({
    type: UPDATING
  })
  try {
    const { activities } = store.getState().auth
    const { id, total, approved } = activity
    await Activities.doc(id).delete()

    dispatch({
      type: SET_USER,
      payload: {
        activities: {
          pending: approved ? activities.pending : activities.pending - total,
          approved: !approved ? activities.approved : activities.approved - total,
        }
      }
    })
    dispatch({
      type: DELETE_ACTIVITY,
      payload: id
    })
    dispatch(setFeedback({
      type: 'success',
      msg: translation.activityRemoved
    }))
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR
    })
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const getActivities = (query, last) => async dispatch => {
  if (last) {
    dispatch({
      type: FETCHING_MORE_ACTIVITIES
    });
  } else {
    dispatch({
      type: FETCHING_ACTIVITIES
    })
  }

  try {
    const { region, status, type } = query;
    let queryRef = Activities;

    if (region) {
      queryRef = queryRef.where('region', '==', region)
    }

    if (status === 'approved' || status === 'pending') {
      const value = status === 'approved' ? true : false
      queryRef = queryRef.where('approved', '==', value)
    }

    if (type) {
      queryRef = queryRef.where('type', '==', type)
    }

    queryRef = queryRef.orderBy('dateCreated', 'desc').limit(10);

    if (last) {
      queryRef = queryRef.startAfter(last?.dateCreated)
    }

    const snapshot = await queryRef.get();

    let all = [];
    snapshot.forEach(doc => all.push({ id: doc.id, ...doc.data() }))

    if (last) {
      dispatch({
        type: SET_MORE_ACTIVITIES,
        payload: {
          all,
          isLastResult: all?.length === 0,
          oldQuery: qs.stringify(query),
          currentUid: ''
        }
      })
    } else {
      dispatch({
        type: SET_ACTIVITIES,
        payload: {
          all,
          isLastResult: all?.length === 0,
          oldQuery: qs.stringify(query),
          currentUid: ''
        }
      })
    }
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
    dispatch({
      type: ERROR
    })
  }
}

export const getRegion = (regionName) => async dispatch => {
  dispatch({
    type: FETCHING_REGION
  })
  try {
    console.log(regionName)

    const region = {};

    dispatch({
      type: SET_REGION,
      payload: { region }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
    dispatch({
      type: ERROR
    })
  }
}
