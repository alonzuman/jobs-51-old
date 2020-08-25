import { db } from "../firebase"
import { setAlert } from "./alert"
import firebase from 'firebase'
import store from '../store'
import { closeDialogs } from "./dialogs"
const activitiesRef = db.collection('activities')
const usersRef = db.collection('users')
const activityTypesRef = db.collection('activity-types')

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
    const snapshot = await activitiesRef.where('uid', '==', uid).orderBy('date', 'desc').get()
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
    dispatch(setAlert({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

// TODO


export const incrementUserHours = () => {

}

export const decrementUserHours = () => {

}

export const approveActivity = () => {

}

export const unApproveActivity = () => {

}
