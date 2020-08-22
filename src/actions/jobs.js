import { db } from '../firebase'
import { setAlert } from './alert'
import { closeDialogs } from './dialogs'
import store from '../store'
const jobsRef = db.collection('jobs')

export const addJob = (job) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const ref = jobsRef.doc()
    const newJob = {
      ...job,
      id: ref.id,
      dateCreated: Date.now()
    }
    await jobsRef.doc(ref.id).set(newJob)

    dispatch({
      type: 'ADD_JOB',
      payload: { job: newJob }
    })
    dispatch(closeDialogs())
    dispatch(setAlert({
      msg: 'Success',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const editJob = (job, id) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    await jobsRef.doc(id).set({...job})
    dispatch(closeDialogs())
    dispatch(getJobs())
    dispatch(setAlert({
      msg: 'Success',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const removeJob = (id) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    await jobsRef.doc(id).delete()
    dispatch({
      type: 'REMOVE_JOB',
      payload: { id }
    })
    dispatch(closeDialogs())
    dispatch(setAlert({
      msg: 'Success',
      type: 'success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'ServerError',
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
      const snapshot = await jobsRef.where('id', 'in', savedJobs).get()
      let jobs = []
      snapshot.forEach(doc => jobs.push(doc.data()))
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
        msg: 'ServerError'
      }))
    }
  } else {
    dispatch({
      type: 'SET_SAVED_JOBS',
      payload: { jobs: [] }
    })
  }
}

export const clearGlobalFilters = () => async dispatch => {
  dispatch({
    type: 'CLEAR_FILTERS'
  })
}

export const setGlobalFilters = (filters) => async dispatch => {
  dispatch({
    type: 'SET_FILTERS',
    payload: { filters }
  })
}

export const getJobs = () => async dispatch => {
  const { filters } = store.getState().jobs
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    let snapshot
    if (filters) {
      if (filters.categories && filters.locations) {
        snapshot = await jobsRef
                          .where('categories', 'array-contains-any', filters.categories)
                          .where('location', '==', filters.locations)
                          .orderBy('dateCreated', 'desc')
                          .get()
      } else if (filters.categories) {
        snapshot = await jobsRef
                          .where('categories', 'array-contains-any', filters.categories)
                          .orderBy('dateCreated', 'desc')
                          .get()
      } else if (filters.locations) {
        snapshot = await jobsRef
                          .where('location', '==', filters.locations)
                          .orderBy('dateCreated', 'desc')
                          .get()
      } else {
        snapshot = await jobsRef.orderBy('dateCreated', 'desc').get()
      }
    }

    let jobs = []
    snapshot.forEach(doc => jobs.push({...doc.data(), id: doc.id}))
    dispatch({
      type: 'SET_JOBS',
      payload: {
        jobs
      }
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      msg: 'ServerError',
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
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const saveJob = (uid, jobId) => async dispatch => {
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
      msg: 'ServerError'
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
    if (store.getState().jobs.savedJobs) {
      dispatch({
        type: 'REMOVE_SAVED_JOB',
        payload: { id: jobId }
      })
    }
    dispatch({
      type: 'UNSAVE_JOB',
      payload: { jobId }
    })
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'ServerError'
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
      msg: 'ServerError',
      type: 'error'
    }))
  }
}
