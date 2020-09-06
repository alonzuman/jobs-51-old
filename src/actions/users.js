import store from "../store"
import { db } from "../firebase"
import { capitalizeFirstLetter } from "../utils"
import { setFeedback } from "./feedback"
const usersRef = db.collection('users')

export const getUser = (uid) => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  try {
    const snapshot = await usersRef.doc(uid).get()
    dispatch({
      type: 'SET_USER_PAGE',
      payload: { ...snapshot.data() }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const getUsers = () => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  const { filters } = store.getState().users
  try {
    let snapshot
    if (filters.search) {
      snapshot = await usersRef.where('firstName', '==', capitalizeFirstLetter(filters.search)).get()
    } else if (filters.status) {
      snapshot = await usersRef.where('role', '==', filters.status).get()
    } else if (filters.search && filters.status) {
      snapshot = await usersRef.where('firstName', '==', capitalizeFirstLetter(filters.search)).where('role', '==', filters.status).get()
    } else {
      snapshot = await usersRef.get()
    }
    let users = []
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'SET_USERS',
      payload: { users }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const setUserFilters = (filter) => async dispatch => {
  dispatch({
    type: 'SET_USERS_FILTER',
    payload: { ...filter }
  })
}

export const clearUserFilters = () => async dispatch => {
  dispatch({
    type: 'CLEAR_USERS_FILTERS'
  })
}

export const changeUserRole = (uid, role) => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  try {
    await usersRef.doc(uid).set({
      role
    }, { merge: true })
    dispatch({
      type: 'USER_STOP_LOADING'
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const getEmployees = () => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  try {
    const snapshot = await usersRef.where('lookingForJob', '==', true).get()
    let users = []
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: 'SET_USERS',
      payload: { users }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}
