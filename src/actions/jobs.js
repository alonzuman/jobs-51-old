import { db } from '../firebase'
import { setAlert } from './alert'
import { closeDialogs } from './dialogs'

export const addJob = (job) => async dispatch => {
  dispatch({
    type: 'JOB_LOADING'
  })
  try {
    const res = await db.collection('jobs').add(job)
    dispatch({
      type: 'ADD_JOB',
      payload: { job }
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
    const snapshot = await db.collection('jobs').get()
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
      msg: 'Server error, please try again',
      type: 'error'
    }))
  }
}
