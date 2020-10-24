import { db } from "../firebase"
import { setFeedback } from "./feedback"
import firebase from 'firebase'
import store from "../store"
const savedRef = db.collection('saved')
const userRef = db.collection('users')

export const getSavedJobs = uid => async dispatch => {
  dispatch({
    type: 'SAVED_LOADING'
  })

  try {
    const snapshot = await savedRef.where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    let jobs = []
    snapshot.forEach(doc => jobs.push({ id: doc.id, ...doc.data() }))

    dispatch({
      type: 'SET_SAVED',
      payload: {
        jobs,
        currentUid: uid
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const saveJob = (uid, jid, job) => async dispatch => {
  const { savedJobs } = store.getState().auth

  try {
    console.log(job)

    await userRef.doc(uid).update({
      savedJobs: firebase.firestore.FieldValue.arrayUnion(jid)
    })

    await savedRef.doc(`${uid}_${jid}`).set({
      uid,
      id: jid,
      dateCreated: Date.now(),
      jobTitle: job?.jobTitle,
      location: job?.location,
      company: job?.company,
      avatar: job?.avatar
    })

    dispatch({
      type: 'SET_USER',
      payload: {
        savedJobs: [...savedJobs, jid]
      }
    })

    dispatch({
      type: 'ADD_SAVED',
      payload: job
    })

    dispatch(setFeedback({
      type: 'success',
      msg: 'jobSavedSuccessfully'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const unsaveJob = (uid, jid) => async dispatch => {
  const { savedJobs } = store.getState().auth
  const { jobs } = store.getState().saved

  try {
    await userRef.doc(uid).update({
      savedJobs: firebase.firestore.FieldValue.arrayRemove(jid)
    })

    await savedRef.doc(`${uid}_${jid}`).delete()

    dispatch({
      type: 'SET_USER',
      payload: {
        savedJobs: savedJobs.filter(v => v !== jid)
      }
    })

    dispatch({
      type: 'SET_SAVED',
      payload: {
        jobs: [...jobs.filter(v => v.id !== jid)]
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}
