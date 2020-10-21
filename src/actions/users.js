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
    const userSnapshot = await usersRef.doc(uid).get()
    const jobsSnapshot = await db.collection('jobs').where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    let results = []
    jobsSnapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))

    const user = {
      uid,
      ...userSnapshot.data(),
      jobs: results
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

export const getUsers = () => async dispatch => {
  dispatch({
    type: 'USERS_LOADING'
  })
  const { filters } = store.getState().users
  try {
    let snapshot
    if (filters.search && filters.status) {
      snapshot = await usersRef.where('firstName', '==', capitalizeFirstLetter(filters.search)).where('role', '==', filters.status).orderBy('dateCreated', 'desc').get()
    } else if (filters.status) {
      snapshot = await usersRef.where('role', '==', filters.status).orderBy('dateCreated', 'desc').get()
    } else if (filters.search) {
      snapshot = await usersRef.where('firstName', '==', capitalizeFirstLetter(filters.search)).orderBy('dateCreated', 'desc').get()
    } else {
      snapshot = await usersRef.orderBy('dateCreated', 'desc').get()
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

export const getUserAndActivities = (uid) => async dispatch => {
  dispatch({ type: 'ACTIVITY_LOADING' })
  dispatch({ type: 'USERS_LOADING' })
  try {
    const userSnapshot = await usersRef.doc(uid).get()
    const activitySnapshot = await db.collection('activities').where('uid', '==', uid).get()
    const user = { id: userSnapshot.id, ...userSnapshot.data() }
    let activities = []
    activitySnapshot.forEach(doc => activities.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: "SET_ACTIVITIES",
      payload: { activities },
    });
    dispatch({
      type: 'SET_USER_PAGE',
      payload: { ...user }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'USER_STOP_LOADING'
    })
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const toggleVolunteer = ({ uid, currentValue }) => async dispatch => {
  const authState = store.getState().auth
  dispatch({
    type: 'USER_LOADING'
  })
  try {
    await usersRef.doc(uid).update('volunteer', currentValue)
    if (uid === authState.uid) {
      dispatch({
        type: 'UPDATED_PROFILE',
        payload: {
          volunteer: currentValue
        }
      })
    } else {
      dispatch({
        type: 'TOGGLE_VOLUNTEER',
        payload: { uid, currentValue }
      })
    }
    dispatch(setFeedback({
      type: 'success',
      msg: 'Success'
    }))
  } catch (error) {
    console.log(error);
    dispatch({
      type: "USER_STOP_LOADING",
    });
    dispatch(
      setFeedback({
        type: "error",
        msg: "ServerError",
      })
    );
  }
}

export const toggleRegion = ({ uid, region }) => async dispatch => {
  dispatch({
    type: 'USER_LOADING'
  })
  try {
    await usersRef.doc(uid).update('region', region)
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        region
      }
    })
    dispatch(
      setFeedback({
        type: "success",
        msg: "Success",
      })
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: "USER_STOP_LOADING",
    });
    dispatch(
      setFeedback({
        type: "error",
        msg: "ServerError",
      })
    );
  }
}

export const deleteUser = uid => async dispatch => {
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
