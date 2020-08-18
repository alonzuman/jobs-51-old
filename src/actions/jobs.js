import { db } from '../firebase'
import { setAlert } from './alert'
import { closeDialogs } from './dialogs'

export const addJob = (job) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const ref = db.collection('jobs').doc()
    const newJob = {
      ...job,
      id: ref.id
    }
    await db.collection('jobs').doc(ref.id).set(newJob)
    const jobType = await db.collection('jobTypes').doc(job.type).get()
    const jobLocation = await db.collection('jobLocations').doc(job.location).get()

    if (jobLocation.data()) {
      const oldJobLocationCount = jobLocation.data().count
      const newJobLocationCount = oldJobLocationCount + 1
      await db.collection('jobLocations').doc(job.location).set({ count: newJobLocationCount })
    } else {
      await db.collection('jobLocations').doc(job.location).set({ count: 1 })
    }

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

export const removeJob = (id, job) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const jobRef = await db.collection('jobs').doc(id).get()
    await db.collection('jobs').doc(id).delete()
    const jobTypeRef = await db.collection('jobTypes').doc(jobRef.data().type).get()
    const jobLocationRef = await db.collection('jobLocations').doc(jobRef.data().location).get()

    if (jobLocationRef.data().count <= 1) {
      await db.collection('jobLocations').doc(jobRef.data().location).delete()
    } else {
      const oldCount = jobLocationRef.data().count
      const newCount = oldCount - 1
      await db.collection('jobLocations').doc(jobRef.data().location).set({
        count: newCount
      })
    }

    if (jobTypeRef.data().count <= 1) {
      await db.collection('jobTypes').doc(jobRef.data().type).delete()
    } else {
      const oldCount = jobTypeRef.data().count
      const newCount = oldCount - 1
      await db.collection('jobTypes').doc(jobRef.data().type).set({
        count: newCount
      })
    }
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

export const getSavedJobs = ({ savedJobs }) => async dispatch => {
  dispatch({
    type: 'SAVED_JOBS_LOADING'
  })
  if (savedJobs.length > 0) {
    try {
      const jobsRef = await db.collection('jobs').where('id', 'in', savedJobs).get()
      let jobs = []
      jobsRef.forEach(doc => jobs.push(doc.data()))
      dispatch({
        type: 'SET_SAVED_JOBS',
        payload: { jobs }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'JOB_FAIL'
      })
      dispatch(setAlert({
        type: 'error',
        msg: 'Server error, please try again'
      }))
    }
  } else {
    dispatch({
      type: 'SET_SAVED_JOBS',
      payload: { jobs: [] }
    })
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
    type: 'JOB_FILTERS_LOADING'
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
    dispatch({
      type: 'SAVE_JOB',
      payload: { jobId }
    })
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
    dispatch({
      type: 'REMOVE_SAVED_JOB',
      payload: { id: jobId }
    })
    dispatch({
      type: 'UNSAVE_JOB',
      payload: { jobId }
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'Server error, please try again'
    }))
  }
}

export const emptyJobs = () => async dispatch => {
  dispatch({
    type: 'EMPTY_JOBS'
  })
}

export const getJobLocations = () => async dispatch => {
  dispatch({
    type: 'JOB_FILTERS_LOADING'
  })
  try {
    const snapshot = await db.collection('jobLocations').get()
    let jobLocations = []
    snapshot.forEach(jobLocation => jobLocations.push(jobLocation.id))
    dispatch({
      type: 'SET_JOB_LOCATIONS',
      payload: {
        jobLocations
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
