import { db } from '../firebase'
import { setAlert } from './alert'
import { closeDialogs } from './dialogs'

export const addJob = (job) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const res = await db.collection('jobs').add(job)
    const jobType = await db.collection('jobTypes').doc(job.type).get()
    if (jobType.data()) {
      const oldJobType = jobType.data()
      const oldCount = oldJobType.count
      const newJobType = {
        count: oldCount + 1
      }
      await db.collection('jobTypes').doc(job.type).set(newJobType)
    } else {
      await db.collection('jobTypes').doc(job.type).set({
        count: 1
      })
    }
    const newJob = {
      ...job,
      id: res.id
    }

    dispatch({
      type: 'ADD_JOB',
      payload: { job: newJob }
    })
    dispatch(closeDialogs())
    dispatch(setAlert({
      msg: 'Success!',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'Server error, please try again',
      type: 'error'
    }))
  }
}

export const editJob = (job, id) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    await db.collection('jobs').doc(id).set({...job})
    dispatch(closeDialogs())
    dispatch(getJobs())
    dispatch(setAlert({
      msg: 'Success!',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'Server error, please try again',
      type: 'error'
    }))
  }
}

export const removeJob = (id) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    await db.collection('jobs').doc(id).delete()
    dispatch({
      type: 'REMOVE_JOB',
      payload: { id }
    })
    dispatch(closeDialogs())
    dispatch(setAlert({
      msg: 'Success!',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'Server error, please try again',
      type: 'error'
    }))
  }
}

export const getJobs = (filters) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    if (filters) {
      const snapshot = await db.collection("jobs").where(Object.keys(filters)[0], "in", Object.values(filters)[0]).get()
      let jobs = []
      snapshot.forEach(doc => jobs.push({...doc.data(), id: doc.id}))
      dispatch({
        type: 'SET_JOBS',
        payload: {
          jobs
        }
      })
    } else {
      const snapshot = await db.collection('jobs').get()
      let jobs = []
      snapshot.forEach(doc => jobs.push({...doc.data(), id: doc.id }))
      dispatch({
        type: 'SET_JOBS',
        payload: {
          jobs
        }
      })
    }
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'Server error, please try again',
      type: 'error'
    }))
  }
}

export const setJob = (job) => async dispatch => {
  dispatch({
    type: 'SET_JOB',
    payload: { job }
  })
}

export const getJobTypes = () => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const snapshot = await db.collection('jobTypes').get()
    let jobTypes = []
    snapshot.forEach(jobType => jobTypes.push(jobType.id))
    dispatch({
      type: 'SET_JOB_TYPES',
      payload: {
        jobTypes
      }
    })
  } catch (error) {
    dispatch({
      type: 'JOB_ERROR'
    })
    dispatch(setAlert({
      msg: 'Server error, please try again',
      type: 'error'
    }))
  }
}

export const savedJob = (uid, jobId) => async dispatch => {
  try {
    await db.collection('users').doc(uid).set({
      savedJobs: [jobId]
    }, { merge: true })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'Server error, please try again'
    }))
  }
}

export const unsaveJob = (uid, jobId) => async dispatch => {
  try {
    const snapshot = await db.collection('users').doc(uid).get()
    const user = {
      ...snapshot.data(),
      savedJobs: snapshot.data().savedJobs.filter(job => job !== jobId)
    }
    await db.collection('users').doc(uid).set(user, { merge: true })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'Server error, please try again'
    }))
  }
}
