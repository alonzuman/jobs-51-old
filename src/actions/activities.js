import { db } from '../firebase'
import { setFeedback } from './feedback'
import firebase from 'firebase'
import store from '../store'
import { closeDialogs } from './dialogs'
const usersRef = db.collection('users')
const activitiesRef = db.collection('activities')
const activityTypesRef = db.collection('activity-types')

export const addActivity = (activity) => async dispatch => {
  const { uid, activities } = store.getState().auth
  dispatch({
    type: 'ACTIVITY_LOADING'
  })
  try {
    const ref = activitiesRef.doc()
    const newActivity = {
      ...activity,
      id: ref.id,
      uid,
      dateCreated: Date.now()
    }
    const { total } = activity
    await activitiesRef.doc(ref.id).set(newActivity)
    const increment = firebase.firestore.FieldValue.increment(total);
    const userRef = await usersRef.doc(uid)
    await userRef.update('activities.pending', increment)
    dispatch(closeDialogs())
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: { newActivity }
    })
    dispatch({
      type: 'SET_USER',
      payload: {
        activities: {
          pending: activities.pending + total,
          approved: activities.approved
        }
      }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'activityAdded'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const getMyActivities = () => async dispatch => {
  const { uid } = store.getState().auth
  dispatch({
    type: 'ACTIVITY_LOADING'
  })
  try {
    const snapshot = await activitiesRef.where('uid', '==', uid).orderBy('date', 'desc').get()
    let activities = []
    snapshot.forEach(doc => activities.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'SET_ACTIVITIES',
      payload: { activities }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const getActivityTypes = () => async dispatch => {
  dispatch({
    type: 'ACTIVITY_LOADING'
  })
  try {
    const snapshot = await activityTypesRef.get()
    let types = []
    snapshot.forEach(doc => types.push(doc.id))
    dispatch({
      type: 'SET_ACTIVITY_TYPES',
      payload: { types }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const approveActivity = (activity) => async dispatch => {
  // TODO add condition that checks if its unapproved already
  try {
    const authState = store.getState().auth
    const { id, total, uid } = activity
    await activitiesRef.doc(id).set({ approved: true }, { merge: true })
    const increment = firebase.firestore.FieldValue.increment(total);
    const decrement = firebase.firestore.FieldValue.increment(-total);

    const userRef = await usersRef.doc(uid)
    await userRef.update('activities.pending', decrement)
    await userRef.update('activities.approved', increment)

    if (authState.uid === uid) {
      dispatch({
        type: 'SET_USER',
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
      msg: 'ActivityApproved'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const unApproveActivity = (activity) => async dispatch => {
  // TODO add condition that checks if its unapproved already
  try {
    const authState = store.getState().auth
    const { id, total, uid } = activity
    await activitiesRef.doc(id).set({ approved: false }, { merge: true })
    const increment = firebase.firestore.FieldValue.increment(total);
    const decrement = firebase.firestore.FieldValue.increment(-total);

    const userRef = await usersRef.doc(uid)
    await userRef.update('activities.approved', decrement)
    await userRef.update('activities.pending', increment)

    if (authState.uid === uid) {
      dispatch({
        type: 'SET_USER',
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
      msg: 'ActivityApproved'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const deleteActivity = (activity) => async dispatch => {
  dispatch({
    type: 'ACTIVITY_LOADING'
  })
  try {
    const { activities } = store.getState().auth
    const { id, uid, total } = activity
    await activitiesRef.doc(id).delete()
    const userRef = await usersRef.doc(uid)
    const decrement = firebase.firestore.FieldValue.increment(-total);

    if (activity.approved) {
      await userRef.update('activities.approved', decrement)
    } else {
      await userRef.update('activities.pending', decrement)
    }
    dispatch({
      type: 'SET_USER',
      payload: {
        activities: {
          pending: activity.approved ? activities.pending : activities.pending - total,
          approved: !activity.approved ? activities.approved : activities.approved - total,
        }
      }
    })
    dispatch({
      type: 'REMOVE_ACTIVITY',
      payload: id
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'ActivityRemoved'
    }))
    dispatch({
      type: 'ACITIVITIES_STOP_LOADING'
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const getActivities = () => async dispatch => {
  dispatch({
    type: 'CLEAR_ACTIVITIES'
  })
  dispatch({
    type: 'ACTIVITY_LOADING'
  })
  try {
    const { region } = store.getState().auth
    const { filters } = store.getState().activities
    let activities = []
    let snapshot
    if (filters.regions && filters.status) {
      snapshot = await activitiesRef.where('region', 'in', filters.regions).where('approved', '==', filters.status === 'approved').orderBy('dateCreated', 'desc').get()
    } else if (filters.regions) {
      snapshot = await activitiesRef.where('region', 'in', filters.regions).orderBy('dateCreated', 'desc').get()
    } else if (filters.status) {
      snapshot = await activitiesRef.where('approved', '==', filters.status === 'approved').where('region', 'in', [region]).orderBy('dateCreated', 'desc').get()
    } else {
      snapshot = await activitiesRef.where('region', '==', region).orderBy('dateCreated', 'desc').get()
    }
    snapshot.forEach(doc => activities.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'SET_ACTIVITIES',
      payload: { activities }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const clearActivityFilters = () => async dispatch => {
  dispatch({
    type: 'CLEAR_ACTIVITY_FILTERS'
  })
}
