import { app, db } from '../firebase'
import firebase from 'firebase'
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

export const signInWithFacebook = () => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const provider = new firebase.auth.FacebookAuthProvider()
    const result = await firebase.auth().signInWithPopup(provider)

    const { uid, displayName, email, photoURL, phoneNumber } = result.user
    const newUser = {
      uid,
      email,
      firstName: displayName.split(' ')[0] || '',
      lastName: displayName.split(' ')[1] || '',
      avatar: photoURL || '',
      phone: phoneNumber || '',
      dateCreated: Date.now()
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
    const msg = () => {
      switch (error.code) {
        case 'auth/account-exists-with-different-credential': return 'accountAlreadyExistsWithEmail'
        default: return 'Server error'
      }
    }

    dispatch({
      type: 'AUTH_FAIL'
    })
    dispatch(setAlert({
      type: 'error',
      msg: msg()
    }))
  }
}

export const signInWithGoogle = () => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await firebase.auth().signInWithPopup(provider)

    const { uid, displayName, email, photoURL, phoneNumber } = result.user
    const fetchedUser = await db.collection('users').doc(uid).get()
    const user = fetchedUser.data()
    const newUser = {
      uid,
      email,
      firstName: user.firstName || displayName.split(' ')[0],
      lastName: user.lastName || displayName.split(' ')[1] || '',
      avatar: user.avatar || photoURL,
      phone: user.phone || phoneNumber,
      dateCreated: user.dateCreated || Date.now()
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
      msg: 'ServerError'
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
      msg: 'ServerError'
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
      msg: 'ServerError'
    }))
  }
}

export const signOut = () => async dispatch =>{
  try {
    app.auth().signOut()
    dispatch({
      type: 'SIGN_OUT'
    })
    dispatch(closeDialogs())
    dispatch(setAlert({
      type: 'success',
      msg: 'SignedOutSuccess'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const addPersonalDetails = (user, personalDetails, uid) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    await db.collection('users').doc(uid).set({...personalDetails}, { merge: true })
    dispatch({
      type: 'SET_USER',
      payload: { uid, ...user, ...personalDetails }
    })
    dispatch(closeDialogs())
  } catch (error) {
    console.log(error)
    dispatch(setAlert({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const editProfile = (user, uid) => async dispatch => {
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
      msg: 'ServerError'
    }))
  }
}
