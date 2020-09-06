import { db } from '../firebase'
import { setFeedback } from './feedback'
import { closeDialogs } from './dialogs'
import store from '../store'
import firebase from 'firebase'
const jobsRef = db.collection('jobs')

export const addFilter = ({ collection, value }) => async dispatch => {
  try {
    const valueRef = await db.collection(collection).doc(value).get()

    if (valueRef.exists) {
      valueRef.ref.update('count', firebase.firestore.FieldValue.increment(1))
    } else {
      valueRef.ref.set({ count: 1 })
    }
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'Server error'
    }))
  }
}

export const removeFilter = ({ collection, value }) => async dispatch => {
  try {
    const valueRef = await db.collection(collection).doc(value).get()
    valueRef.ref.update('count', firebase.firestore.FieldValue.increment(-1))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'Server error'
    }))
  }
}

export const getFilters = (type) => async dispatch => {
  try {
    const filtersRef = await db.collection(type).get()
    let filters = {}
    filtersRef.forEach(doc => filters[doc.id] = doc.data().count)
    return filters
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'Server error'
    }))
  }
}

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

export const editJob = (job, id) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    await jobsRef.doc(id).set({...job})
    dispatch(closeDialogs())
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

export const removeJob = (id, job) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    job.categories.forEach(async category => {
      const categoryRef = await db.collection('categories').doc(category)
      categoryRef.update('count', firebase.firestore.FieldValue.increment(-1))
    })

    await db.collection('locations').doc(job.location).update('count', firebase.firestore.FieldValue.increment(-1))

    await jobsRef.doc(id).delete()

    dispatch({
      type: 'REMOVE_JOB',
      payload: { id }
    })
    dispatch(closeDialogs())
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
      dispatch(setFeedback({
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
      const categoriesQuery = ['categories', 'array-contains-any', filters.categories]
      const locationsQuery = ['location', '==', filters.locations]
      const dateQuery = ['dateCreated', '>=', filters.dates]

      if (filters.categories && filters.locations && filters.dateQuery) {
        snapshot = await jobsRef.where(...categoriesQuery).where(...locationsQuery).where(...dateQuery).orderBy('dateCreated', 'desc').get()
      } else if (filters.categories && filters.locations) {
        snapshot = await jobsRef.where(...categoriesQuery).where(...locationsQuery).orderBy('dateCreated', 'desc').get()
      } else if (filters.categories && filters.dates) {
        snapshot = await jobsRef.where(...categoriesQuery).where(...dateQuery).orderBy('dateCreated', 'desc').get()
      } else if (filters.locations && filters.dates) {
        snapshot = await jobsRef.where(...locationsQuery).where(...dateQuery).orderBy('dateCreated', 'desc').get()
      } else if (filters.locations) {
        snapshot = await jobsRef.where(...locationsQuery).orderBy('dateCreated', 'desc').get()
      } else if (filters.categories) {
        snapshot = await jobsRef.where(...categoriesQuery).orderBy('dateCreated', 'desc').get()
      } else if (filters.dates) {
        snapshot = await jobsRef.where(...dateQuery).orderBy('dateCreated', 'desc').get()
      } else {
        snapshot = await jobsRef.orderBy('dateCreated', 'desc').get()
      }
    } else {
      snapshot = await jobsRef.orderBy('dateCreated', 'desc').get()
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
    dispatch(setFeedback({
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
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}

export const saveJob = (uid, jobId) => async dispatch => {
  try {
    const snapshot = await db.collection('users').doc(uid).get()
    const oldUser = snapshot.data()
    const oldJobs = (oldUser.savedJobs && oldUser.savedJobs.length > 0) ? oldUser.savedJobs : []
    await db.collection('users').doc(uid).set({
      ...oldUser,
      savedJobs: [...oldJobs, jobId]
    }, { merge: true })
    dispatch({
      type: 'SAVE_JOB',
      payload: { jobId }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
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
    dispatch(setFeedback({
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
    const jobSnapshot = await jobsRef.doc(id).get()
    let job = { id: jobSnapshot.id, ...jobSnapshot.data() }
    const { uid } = job
    const userSnapshot = await db.collection('users').doc(uid).get()
    const user = { id: userSnapshot.id, ...userSnapshot.data() }
    job = { ...job, user }
    dispatch({
      type: 'SET_JOB',
      payload: { job }
    })
  } catch (error) {
    dispatch({
      type: 'JOB_ERROR'
    })
    dispatch(setFeedback({
      msg: 'ServerError',
      type: 'error'
    }))
  }
}
