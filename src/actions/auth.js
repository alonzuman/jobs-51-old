import { app, db } from '../firebase'
import { setAlert } from "./alert"
import { closeDialogs } from './dialogs'

export const setUser = (user) => async dispatch => {
  const { uid } = user
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const snapshot = await db.collection('users').doc(uid).get()
    dispatch({
      type: 'SET_USER',
      payload: { uid, ...snapshot.data() }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'SIGN_OUT'
    })
    dispatch(setAlert({
      type: 'error',
      payload: 'Not authenticated'
    }))
  }
}

export const signIn = ({ email, password }) => async dispatch =>{
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const res = await app.auth().signInWithEmailAndPassword(email, password)
    const { uid } = res.user
    const snapshot = await db.collection('users').doc(uid).get()
    const { userInfo } = snapshot.data()
    const user = {
      uid,
      email,
      ...userInfo
    }
    dispatch(closeDialogs())
    dispatch({
      type: 'SIGNED_IN',
      payload: { ...user }
    })
    dispatch(setAlert({
      type: 'success',
      msg: 'Welcome'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'Server error, please try again'
    }))
  }
}

export const signUp = (user) => async dispatch =>{
  dispatch({
    type: 'AUTH_LOADING'
  })
  const { email, password, firstName, lastName, avatar, phone } = user
  try {
    const snapshot = await app.auth().createUserWithEmailAndPassword(email, password)
    const { uid } = snapshot.user
    const newUser = {
      uid,
      email,
      firstName,
      lastName,
      avatar,
      phone,
      dateCreated: new Date()
    }
    await db.collection('users').doc(uid).set(newUser, { merge: true })
    dispatch(closeDialogs())
    dispatch({
      type: 'SIGNED_UP',
      payload: { newUser }
    })
    dispatch(setAlert({
      type: 'success',
      msg: 'Welcome'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'Server error, please try again'
    }))
  }
}

export const signOut = () => async dispatch =>{
  try {
    await app.auth().signOut()
    dispatch({
      type: 'SIGN_OUT'
    })
    dispatch(closeDialogs())
    dispatch(setAlert({
      type: 'success',
      msg: 'Signed out successfully'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'Server error, please try again'
    }))
  }
}

export const editProfile = (user, uid) => async dispatch =>{
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    await db.collection('users').doc(uid).set(user, { merge: true })
    dispatch({
      type: 'SET_USER',
      payload: { uid, ...user, avatar: user.avatar.length > 0 && user.avatar }
    })
    dispatch(setAlert({
      type: 'success',
      msg: 'Success'
    }))
    dispatch(closeDialogs())
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'Server error, please try again'
    }))
  }
}
