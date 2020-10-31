import { db } from "../firebase"
import { setFeedback } from "./feedback"
import { ERROR, LOADING, LOADING_MORE, NO_MORE_RESULTS, SET_ALL, SET_MORE, SET_ONE, UPDATE_ONE, UPDATING } from "../reducers/users"
import store from '../store'
import { SET_USER } from "../reducers/auth"
const { translation } = store.getState().theme
const Users = db.collection('users');
const Jobs = db.collection('jobs');
const Activities = db.collection('activities');

export const getUser = (uid) => async dispatch => {
  dispatch({
    type: LOADING
  })
  try {
    const userSnapshot = await Users.doc(uid).get()
    const jobsSnapshot = await Jobs.where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    const activitiesSnapshot = await Activities.where('uid', '==', uid).orderBy('dateCreated', 'desc').get()

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
      type: SET_ONE,
      payload: user
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const getUsers = (query, last) => async dispatch => {
  dispatch({
    type: NO_MORE_RESULTS,
    payload: false
  })
  if (!last) {
    dispatch({
      type: LOADING
    })
  } else {
    dispatch({
      type: LOADING_MORE
    })
  }
  try {
    const { firstName, lastName, region, role } = query

    let oldUsers;
    if (last) {
      oldUsers = store.getState().users.users
    }

    let queryRef = Users

    if (firstName) {
      queryRef = queryRef.where('firstName', '==', firstName)
    }

    if (lastName) {
      queryRef = queryRef.where('lastName', '==', lastName)
    }

    if (region) {
      queryRef = queryRef.where('volunteer', '==', true).where('region', '==', region)
    }

    if (role) {
      queryRef = queryRef.where('role', '==', role)
    }

    queryRef = queryRef.orderBy('dateCreated', 'desc').limit(10);

    if (last) {
      queryRef = queryRef.startAfter(last?.dateCreated)
    }

    const snapshot = await queryRef.get()

    let users = []
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }))
    if (users?.length === 0) {
      dispatch({
        type: NO_MORE_RESULTS,
        payload: true
      })
    }
    if (last) {
      dispatch({
        type: SET_MORE,
        payload: { users }
      })
    } else {
      dispatch({
        type: SET_ALL,
        payload: { users }
      })
    }
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const deleteUser = (uid) => async dispatch => {
  dispatch({
    type: LOADING
  })

  try {
    await db.collection('users').doc(uid).delete()
    dispatch(setFeedback({
      type: 'success',
      msg: translation.success
    }))
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

export const approveUser = uid => async dispatch => {
  dispatch({
    type: LOADING
  })

  try {
    await Users.doc(uid).update({
      role: 'user'
    })
    dispatch({
      type: UPDATE_ONE,
      payload: {
        role: 'user'
      }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: translation.success
    }))
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

export const unapproveUser = uid => async dispatch => {
  dispatch({
    type: LOADING
  })

  try {
    dispatch(deleteUser(uid))
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

export const updateUser = (newUser) => async dispatch => {
  const { uid } = store.getState().auth
  dispatch({
    type: UPDATING
  })
  try {
    await Users.doc(newUser.uid).set({
      ...newUser
    }, { merge: true })

    if (uid === newUser.uid) {
      dispatch({
        type: SET_USER,
        payload: {
          ...newUser
        }
      })
    }

    dispatch({
      type: SET_ONE,
      payload: {
        ...newUser
      }
    })

    dispatch(setFeedback({
      type: 'success',
      msg: translation.userUpdatedSuccessfully
    }))
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
