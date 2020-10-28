import store from "../store"
import { db } from "../firebase"
import { setFeedback } from "./feedback"
const usersRef = db.collection('users')

export const getUser = (uid) => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  try {
    const userSnapshot = await usersRef.doc(uid).get()
    const jobsSnapshot = await db.collection('jobs').where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    const activitiesSnapshot = await db.collection('activities').where('uid', '==', uid).orderBy('dateCreated', 'desc').get()

    let jobs = []
    let activities = []

    jobsSnapshot.forEach(doc => jobs.push({ id: doc.id, ...doc.data() }))
    activitiesSnapshot.forEach(doc => activities.push({ id: doc.id, ...doc.data() }))
    const user = {
      uid,
      ...userSnapshot.data(),
      jobs: jobs,
      activitiesList: activities
    }

    dispatch({
      type: 'SET_USER_PAGE',
      payload: user
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const getUsers = query => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  try {
    const { firstName, lastName, region } = query

    let queryRef = usersRef

    if (firstName) {
      queryRef = queryRef.where('firstName', '==', firstName)
    }

    if (lastName) {
      queryRef = queryRef.where('lastName', '==', lastName)
    }

    if (region) {
      queryRef = queryRef.where('region', '==', region)
    }

    const snapshot = await queryRef.orderBy('dateCreated', 'desc').limit(10).get()

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

export const deleteUser = ({ uid, firstName, lastName }) => async dispatch => {
  dispatch({
    type: 'USER_LOADING'
  })

  try {
    const snapshot = await db.collection('activities').where('uid', '==', uid).get()
    snapshot.forEach(async doc => await db.collection('activities').doc(doc.id).delete())
    await db.collection('users').doc(uid).delete()

    dispatch(setFeedback({
      type: 'success',
      msg: 'Success'
    }))
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'USER_STOP_LOADING'
    })
    dispatch(setFeedback({
      type: 'error',
      msg: 'serverError'
    }))
  }
}

export const approveUser = uid => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })

  try {
    await usersRef.doc(uid).update({
      role: 'user'
    })
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        role: 'user'
      }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'Success'
    }))
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'USER_STOP_LOADING'
    })
    dispatch(setFeedback({
      type: 'error',
      msg: 'serverError'
    }))
  }
}

export const unapproveUser = uid => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })

  try {
    dispatch(deleteUser(uid))
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'USER_STOP_LOADING'
    })
    dispatch(setFeedback({
      type: 'error',
      msg: 'serverError'
    }))
  }
}

export const updateUser = ({ newUser }) => async dispatch => {
  const { uid } = store.getState().auth
  dispatch({
    type: 'USERS_UPDATING'
  })
  try {
    await usersRef.doc(newUser.uid).set({
      ...newUser
    }, { merge: true })

    if (uid === newUser.uid) {
      dispatch({
        type: 'UPDATED_PROFILE',
        payload: {
          ...newUser
        }
      })
    }

    dispatch({
      type: 'SET_USER_PAGE',
      payload: {
        ...newUser
      }
    })

    dispatch(setFeedback({
      type: 'success',
      msg: 'userUpdatedSuccessfully'
    }))
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'USER_STOP_LOADING'
    })
    dispatch(setFeedback({
      type: 'error',
      msg: 'serverError'
    }))
  }
}
