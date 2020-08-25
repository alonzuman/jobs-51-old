import { db } from "../firebase"
import { setAlert } from "./alert"
import store from '../store'
const activitiesRef = db.collection('activities')

export const addActivity = (activity) => async dispatch => {
  const { uid } = store.getState().auth
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
    await activitiesRef.doc(ref.id).set(newActivity)
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: { newActivity }
    })
    dispatch(setAlert({
      type: 'success',
      msg: 'activityAdded'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
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
    const snapshot = await activitiesRef.where('uid', '==', uid).get()
    let activities = []
    snapshot.forEach(doc => activities.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'SET_ACTIVITIES',
      payload: { activities }
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}
