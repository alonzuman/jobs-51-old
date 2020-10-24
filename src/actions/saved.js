import { db } from "../firebase"
import { setFeedback } from "./feedback"
import firebase from 'firebase'
const savedRef = db.collection('saved')
const userRef = db.collection('users')

export const getSavedJobs = uid => async dispatch => {
  dispatch({
    type: 'SAVED_LOADING'
  })

  try {
    const snapshot = await savedRef.where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    let results = []
    snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))

    console.log(results)
    dispatch({
      type: 'SET_SAVED',
      payload: results
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const saveJob = (uid, jid) => async dispatch => {
  try {
    await userRef.doc(uid).update({
      savedJobs: firebase.firestore.FieldValue.arrayUnion(jid)
    })
    await savedRef.add({
      uid,
      jid,
      dateCreated: Date.now()
    })
    // TODO add savedid from user
    // TODO add job to list
    console.log('added', jid, 'to', uid)
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const unsaveJob = (uid, jid) => async dispatch => {
  try {
    await userRef.doc(uid).update({
      savedJobs: firebase.firestore.FieldValue.arrayRemove(jid)
    })

    await savedRef.doc(jid).delete()
    // TODO remove job from list
    // TODO remove id from userlist
    console.log('removed', jid, 'to', uid)
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}
