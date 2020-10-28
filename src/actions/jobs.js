import { db } from '../firebase'
import { setFeedback } from './feedback'
import firebase from 'firebase'
const Jobs = db.collection('jobs')

export const addJob = (job) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const ref = Jobs.doc()
    const newJob = {
      ...job,
      id: ref.id,
      dateCreated: Date.now()
    }
    await Jobs.doc(ref.id).set(newJob)

    await db.collection('constants').doc('listedLocations').update({
      [job.location]: firebase.firestore.FieldValue.increment(1)
    })

    await job.skills.forEach(async v => {
      await db.collection('constants').doc('listedSkills').update({
        [v]: firebase.firestore.FieldValue.increment(1)
      })
    })

    dispatch({
      type: 'ADD_JOB',
      payload: { job: newJob }
    })
    dispatch(setFeedback({
      msg: 'Success',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const updateJob = (newJob) => async dispatch => {
  dispatch({
    type: 'JOB_UPDATING'
  })
  try {
    await Jobs.doc(newJob?.id).update({
      ...newJob
    })
    dispatch({
      type: 'SET_JOB',
      payload: { newJob }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

// TODO delete
export const editJob = (job, id) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    await Jobs.doc(id).set({ ...job })
    dispatch(getJobs())
    dispatch(setFeedback({
      msg: 'Success',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const deleteJob = (job) => async dispatch => {
  const { id } = job
  dispatch({
    type: 'JOB_DELETING'
  })
  try {
    await db.collection('constants').doc('listedLocations').update({
      [job.location]: firebase.firestore.FieldValue.increment(-1)
    })

    await job.skills.forEach(async v => {
      await db.collection('constants').doc('listedSkills').set({
        [v]: firebase.firestore.FieldValue.increment(-1)
      }, { merge: true })
    })

    await Jobs.doc(id).delete()
    dispatch({
      type: 'JOB_DELETED',
      payload: { id }
    })
    dispatch(setFeedback({
      msg: 'Success',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const getJobs = query => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const { skills, location, industry } = query
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

    const snapshot = await queryRef.get()

    let jobs = []
    snapshot.forEach(doc => jobs.push({ ...doc.data(), id: doc.id }))

    dispatch({
      type: 'SET_JOBS',
      payload: {
        jobs
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const getJob = (id) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
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

    const jobsSnapshot = await db.collection('jobs').where('industry', '==', industry).get()
    let similarJobs = []
    jobsSnapshot.forEach(doc => similarJobs.push({ id: doc.id, ...doc.data() }))

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
      type: 'SET_JOB',
      payload: { job }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'JOB_ERROR'
    })
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}
