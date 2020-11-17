import { db } from '../firebase'
import { setFeedback } from './feedback'
import firebase from 'firebase'
import store from '../store'
import { ADDING_JOB, ADD_ONE, ADD_SAVED_ONE, DELETE_ONE, DELETE_SAVED_ONE, DELETING, ERROR, FETCHING_JOBS, FETCHING_MORE_JOBS, LOADING, SET_ALL, SET_MORE_JOBS, SET_ONE, SET_SAVED_JOBS, UPDATING } from '../reducers/jobs'
const { translation } = store.getState().theme
const Jobs = db.collection('jobs')

export const getSavedJobs = (uid) => async dispatch => {
  dispatch({
    type: LOADING
  })
  try {
    const jobsSnapshot = await Jobs.where('savedIds', 'array-contains', uid).orderBy('dateCreated', 'desc').get()
    let jobs = [];
    jobsSnapshot.forEach(doc => jobs.push({ id: doc.id, ...doc.data() }));

    dispatch({
      type: SET_SAVED_JOBS,
      payload: {
        jobs,
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

export const saveJob = (uid, jid, job) => async dispatch => {
  try {
    await Jobs.doc(jid).update({
      savedIds: firebase.firestore.FieldValue.arrayUnion(uid)
    })

    dispatch({
      type: ADD_SAVED_ONE,
      payload: { ...job }
    })

    dispatch({
      type: SET_ONE,
      payload: { ...job, savedIds: [...job.savedIds || [], uid] }
    })

    dispatch(setFeedback({
      type: 'success',
      msg: translation.jobSavedSuccessfully
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: translation.serverError,
      type: 'error'
    }))
  }
}

export const unsaveJob = (uid, jid, job) => async dispatch => {
  try {
    await Jobs.doc(jid).update({
      savedIds: firebase.firestore.FieldValue.arrayRemove(uid)
    })

    dispatch({
      type: DELETE_SAVED_ONE,
      payload: jid
    })

    dispatch({
      type: SET_ONE,
      payload: { ...job, savedIds: [...job.savedIds.filter(v => v !== uid)] }
    })

    dispatch(setFeedback({
      type: 'success',
      msg: translation.jobUnSavedSuccessfully
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: translation.serverError,
      type: 'error'
    }))
  }
}

export const addJob = (job) => async dispatch => {
  dispatch({
    type: ADDING_JOB
  })
  try {
    const jobRef = Jobs.doc()

    const newJob = {
      ...job,
      id: jobRef.id,
      dateCreated: Date.now(),
      savedIds: []
    }
    await Jobs.doc(jobRef.id).set(newJob)

    dispatch({
      type: ADD_ONE,
      payload: { job: newJob }
    })
    dispatch(setFeedback({
      msg: translation.success,
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR
    })
    dispatch(setFeedback({
      msg: translation.serverError,
      type: 'error'
    }))
  }
}

export const updateJob = (newJob) => async dispatch => {
  dispatch({
    type: UPDATING
  })
  try {
    await Jobs.doc(newJob?.id).update({
      ...newJob
    })
    dispatch({
      type: SET_ONE,
      payload: { ...newJob }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: translation.serverError,
      type: 'error'
    }))
  }
}

export const deleteJob = (job) => async dispatch => {
  dispatch({
    type: DELETING
  })
  try {
    await Jobs.doc(job.id).delete()
    dispatch({
      type: DELETE_ONE,
      payload: { id: job.id }
    })
    dispatch(setFeedback({
      msg: translation.success,
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: translation.serverError,
      type: 'error'
    }))
  }
}

export const getJobs = (query, last) => async dispatch => {
  if (last) {
    dispatch({
      type: FETCHING_MORE_JOBS
    })
  } else {
    dispatch({
      type: FETCHING_JOBS
    })
  }
  try {
    const { skills, location, industry, dateCreated } = query
    const skillsExists = skills?.length > 0

    let queryRef = Jobs;

    if (skillsExists) {
      queryRef = queryRef.where('skills', 'array-contains-any', skills)
    }

    if (location) {
      queryRef = queryRef.where('location', '==', location)
    }

    if (industry) {
      queryRef = queryRef.where('industry', '==', industry)
    }

    if (dateCreated) {
      queryRef = queryRef.where('dateCreated', '>', parseInt(dateCreated))
    }

    queryRef = queryRef.orderBy('dateCreated', 'desc').limit(10)

    if (last) {
      queryRef = queryRef.startAfter(last?.dateCreated)
    }

    const snapshot = await queryRef.get()

    let jobs = []
    snapshot.forEach(doc => jobs.push({ ...doc.data(), id: doc.id }))

    if (last) {
      dispatch({
        type: SET_MORE_JOBS,
        payload: {
          moreJobs: jobs,
          query
        }
      })
    } else {
      dispatch({
        type: SET_ALL,
        payload: {
          jobs,
          query
        }
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR
    })
    dispatch(setFeedback({
      msg: translation.serverError,
      type: 'error'
    }))
  }
}

export const getJob = (id) => async dispatch => {
  dispatch({
    type: LOADING
  })
  try {
    const jobSnapshot = await Jobs.doc(id).get()
    let job = {
      id: jobSnapshot.id,
      ...jobSnapshot.data()
    }

    const { uid, industry } = job
    const userSnapshot = await db.collection('users').doc(uid).get()
    const user = {
      id: userSnapshot.id,
      ...userSnapshot.data()
    }

    let similarJobs = []
    if (industry) {
      const jobsSnapshot = await db.collection('jobs').where('industry', '==', industry).get()
      jobsSnapshot.forEach(doc => similarJobs.push({ id: doc.id, ...doc.data() }))
    }

    job = {
      ...job,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        email: user.email,
        uid: user.uid,
        role: user.role,
        phone: user.phone,
        hometown: user.hometown,
        serviceYear: user.serviceYear
      },
      similarJobs
    }

    dispatch({
      type: SET_ONE,
      payload: { ...job }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR
    })
    dispatch(setFeedback({
      msg: translation.serverError,
      type: 'error'
    }))
  }
}
