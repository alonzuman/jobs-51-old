import { app, db } from '../firebase'
import firebase from 'firebase'
import { closeDialogs } from './dialogs'
import { setFeedback } from './feedback'
const usersRef = db.collection('users')

export const setUser = (user) => async dispatch => {
  const { uid } = user
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const snapshot = await usersRef.doc(uid).get()
    dispatch({
      type: 'SET_USER',
      payload: { uid, ...snapshot.data() }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'SIGN_OUT'
    })
    dispatch(setFeedback({
      type: 'error',
      payload: 'Not authenticated'
    }))
  }
}

export const signInWithProvider = (provider) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const firebaseProvider = () => {
      switch (provider) {
        case 'facebook': return new firebase.auth.FacebookAuthProvider();
        case 'google': return new firebase.auth.GoogleAuthProvider();
        default: return null
      }
    }

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
      const result = await firebase.auth().signInWithPopup(firebaseProvider())
      const { uid, displayName, email, photoURL, phoneNumber } = result.user
      const fetchedUser = await usersRef.doc(uid).get()
      const user = fetchedUser.data()
      if (!user?.uid || !user) {
        const newUser = {
          uid,
          email,
          firstName: displayName?.split(' ')[0] || '',
          lastName: displayName?.split(' ')[1] || '',
          avatar: photoURL || '',
          phone: phoneNumber || '',
          lookingForJob: false,
          activities: {
            pending: 0,
            approved: 0
          },
          role: user?.role ? user?.role : 'user',
          dateCreated: Date.now()
        }
        await usersRef.doc(uid).set(newUser, { merge: true })
        dispatch(closeDialogs())
        dispatch({
          type: 'SIGNED_UP',
          payload: { ...newUser }
        })
        dispatch(setFeedback({
          type: 'success',
          msg: 'Welcome'
        }))
      } else {
        dispatch(closeDialogs())
        dispatch({
          type: 'SIGNED_UP',
          payload: { ...user }
        })
        dispatch(setFeedback({
          type: 'success',
          msg: 'Welcome'
        }))
      }
    })
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
    dispatch(setFeedback({
      type: 'error',
      msg: msg()
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
    const snapshot = await usersRef.doc(uid).get()
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
    dispatch(setFeedback({
      type: 'success',
      msg: 'Welcome'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
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
      activities: {
        pending: 0,
        approved: 0
      },
      lookingForJob: false,
      role: 'user',
      dateCreated: new Date()
    }
    await usersRef.doc(uid).set(newUser, { merge: true })
    dispatch(closeDialogs())
    dispatch({
      type: 'SIGNED_UP',
      payload: { ...newUser }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'Welcome'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const signOut = () => async dispatch =>{
  try {
    app.auth().signOut()
    dispatch(closeDialogs())
    dispatch({
      type: 'SIGN_OUT'
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'SignedOutSuccess'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
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
    await usersRef.doc(uid).set({...personalDetails}, { merge: true })
    dispatch({
      type: 'SET_USER',
      payload: { uid, ...user, ...personalDetails }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'Success'
    }))
    dispatch(closeDialogs())
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
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
    await usersRef.doc(uid).set(user, { merge: true })
    dispatch({
      type: 'SET_USER',
      payload: { uid, ...user, avatar: user.avatar.length > 0 && user.avatar }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'Success'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const setUserRegion = (region, uid) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    await usersRef.doc(uid).set({ region }, { merge: true })
    dispatch({
      type: 'SET_USER',
      payload: { region }
    })
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}

export const toggleLookingForJob = ({ uid, currentValue }) => async dispatch => {
  dispatch({
    type: 'USER_LOADING'
  })
  try {
    const userRef = usersRef.doc(uid)
    await userRef.update('lookingForJob', currentValue)
    dispatch({
      type: 'SET_USER',
      payload: {
        lookingForJob: currentValue
      }
    })
    dispatch(setFeedback({
      type: 'success',
      msg: 'actionSuccedded'
    }))
  } catch (error) {
    console.log(error)
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))

  }
}
