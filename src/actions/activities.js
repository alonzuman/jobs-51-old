import { db } from '../firebase'
import { setFeedback } from './feedback'
import { ADD_ONE, DELETE_ONE, ERROR, LOADING, LOADING_MANAGERS, LOADING_MORE, NO_MORE_RESULTS, SET_ALL, SET_MANAGERS, SET_MORE } from '../reducers/activities'
import store from '../store'
import { SET_USER } from '../reducers/auth'
const { translation } = store.getState().theme
const Activities = db.collection('activities')
const Users = db.collection('users')

export const addActivity = (activity) => async dispatch => {
  const { uid, activities } = store.getState().auth
  dispatch({
    type: LOADING
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
      type: ADD_ONE,
      payload: { newActivity }
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
    type: LOADING
  })

  try {
    const activitiesSnapshot = await Activities.where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    let results = []
    activitiesSnapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))

    dispatch({
      type: SET_ALL,
      payload: {
        activities: results,
        currentUid: uid
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const approveActivity = (activity) => async dispatch => {
  try {
    const authState = store.getState().auth
    const { id, total, uid } = activity
    await Activities.doc(id).set({ approved: true }, { merge: true })

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

export const unApproveActivity = (activity) => async dispatch => {
  try {
    const authState = store.getState().auth
    const { id, total, uid } = activity
    await Activities.doc(id).set({ approved: false }, { merge: true })

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
    type: LOADING
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
      type: DELETE_ONE,
      payload: id
    })
    dispatch(setFeedback({
      type: 'success',
      msg: translation.activityRemoved
    }))
    dispatch({
      type: ERROR
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const getActivities = (query, last) => async dispatch => {
  dispatch({
    type: NO_MORE_RESULTS,
    payload: false
  })
  if (!last) {
    dispatch({
      type: LOADING
    });
  } else {
    dispatch({
      type: LOADING_MORE
    })
  }

  try {
    const { selectedRegion: region, approved } = query;

    let queryRef = Activities;

    if (region) {
      queryRef = queryRef.where('region', '==', region)
    }

    if (approved === 'approved') {
      queryRef = queryRef.where('approved', '==', true)
    } else if (approved === 'pending') {
      queryRef = queryRef.where('approved', '==', false)
    }

    queryRef = queryRef.orderBy('dateCreated', 'desc').limit(10);

    if (last) {
      queryRef = queryRef.startAfter(last?.dateCreated)
    }

    const snapshot = await queryRef.get();

    let activities = [];
    snapshot.forEach(doc => activities.push({ id: doc.id, ...doc.data() }))

    if (activities?.length === 0) {
      dispatch({
        type: NO_MORE_RESULTS
      })
    }

    if (last) {
      dispatch({
        type: SET_MORE,
        payload: { activities }
      })
    } else {
      dispatch({
        type: SET_ALL,
        payload: { activities }
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

export const getRegionManagers = (region) => async dispatch => {
  dispatch({
    type: LOADING_MANAGERS
  })
  try {
    const managersSnapshot = await Users.where('region', '==', region).where('role', '==', 'moderator').get()
    let regionManagers = [];
    managersSnapshot.forEach(doc => regionManagers.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: SET_MANAGERS,
      payload: regionManagers
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR
    })
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}
