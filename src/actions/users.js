import { db } from "../firebase"
import { setFeedback } from "./feedback"
import store from '../store'
import { UPDATE_MY_USER } from "../reducers/auth"
import { DELETING_USER, SET_USER, ERROR, FETCHING_MORE_USERS, FETCHING_USER, FETCHING_USERS, SET_MORE_USERS, SET_USERS, UPDATING_USER } from "../reducers/users"
import qs from 'query-string'
const { translation } = store.getState().theme
const Users = db.collection('users');
const Jobs = db.collection('jobs');
const Activities = db.collection('activities');

export const getUser = (uid) => async dispatch => {
  dispatch({
    type: FETCHING_USER
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
      type: SET_USER,
      payload: { ...user }
    })
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

export const getUsers = (query, last) => async dispatch => {
  if (!last) {
    dispatch({
      type: FETCHING_USERS
    })
  } else {
    dispatch({
      type: FETCHING_MORE_USERS
    })
  }

  try {
    let queryRef = Users

    if (query.fullName) {
      const firstName = query.fullName.split(' ')[0]
      const lastName = query.fullName.split(' ').splice(1).join(' ')
      queryRef = queryRef.where('firstName', '==', firstName).where('lastName', '==', lastName)
    }

    if (query?.region) {
      queryRef = queryRef.where('volunteer', '==', true).where('region', '==', query?.region)
    }

    if (query?.role) {
      queryRef = queryRef.where('role', '==', query?.role)
    }

    if (query?.dateCreated) {
      queryRef = queryRef.where('dateCreated', '>', parseInt(query?.dateCreated))
    }

    queryRef = queryRef.orderBy('dateCreated', 'desc').limit(10);

    if (last) {
      queryRef = queryRef.startAfter(last?.dateCreated)
    }

    const snapshot = await queryRef.get()

    let all = []
    snapshot.forEach(doc => all.push({ id: doc.id, ...doc.data() }))

    if (last) {
      dispatch({
        type: SET_MORE_USERS,
        payload: {
          all,
          isLastResult: all?.length === 0,
          query: qs.stringify(query)
        }
      })
    } else {
      dispatch({
        type: SET_USERS,
        payload: {
          all,
          isLastResult: false,
          query: qs.stringify(query)
        }
      })
    }
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

export const deleteUser = (uid) => async dispatch => {
  dispatch({
    type: DELETING_USER
  })

  try {
    await Users.doc(uid).delete()
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
    type: UPDATING_USER
  })

  try {
    await Users.doc(uid).update({
      role: 'user'
    })
    dispatch({
      type: SET_USER,
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
    type: DELETING_USER
  })
  try {
    await dispatch(deleteUser(uid))
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
    type: UPDATING_USER
  })
  try {
    await Users.doc(newUser.uid).set({
      ...newUser
    }, { merge: true })

    if (uid === newUser.uid) {
      dispatch({
        type: UPDATE_MY_USER,
        payload: {
          ...newUser
        }
      })
    }

    dispatch({
      type: SET_USER,
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
