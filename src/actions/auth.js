import { app, db } from '../firebase';
import firebase from 'firebase';
import { setFeedback } from './feedback';
import store from '../store';
const Users = db.collection('users');
const Members = db.collection('constants').doc('members').collection('all');

export const setUser = (user) => async dispatch => {
  const { uid } = user
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const snapshot = await Users.doc(uid).get()
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

export const checkIfUserLegit = ({ email, firstName, lastName }) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })

  try {
    const hasName = firstName && lastName
    const hasEmail = email;
    if (!hasName && !hasEmail) return false;

    const emailQuery = Members.where('email', '==', email);
    const nameQuery = Members.where('firstName', '==', firstName).where('lastName', '==', lastName);

    let results = [];

    const emailQuerySnapshot = await emailQuery.get();
    if (emailQuerySnapshot.size === 0) {
      const nameQuerySnapshot = await nameQuery.get();
      nameQuerySnapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    } else {
      emailQuerySnapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    }

    const verifiedUser = results[0];

    if (!verifiedUser) return false;
    if (verifiedUser) {
      return {
        ...verifiedUser,
        isApproved: true
      }
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'AUTH_ERROR'
    })
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

      const checkLegitRes = await dispatch(checkIfUserLegit({
        email,
        firstName: displayName?.split(' ')[0],
        lastName: displayName?.split(' ')[1]
      }))

      const fetchedUser = await Users.doc(uid).get()
      const user = fetchedUser.data()

      if (fetchedUser.id) {
        dispatch({
          type: 'SIGNED_UP',
          payload: { ...user }
        })
        dispatch(setFeedback({
          type: 'success',
          msg: 'Welcome'
        }))
      } else if (!fetchedUser.id || checkLegitRes) {
        const newUser = {
          uid,
          email,
          firstName: displayName?.split(' ')[0] || checkLegitRes?.firstName || '',
          lastName: displayName?.split(' ')[1] || checkLegitRes?.lastName || '',
          serviceYear: checkLegitRes?.serviceYear || '',
          avatar: photoURL || '',
          phone: phoneNumber || '',
          volunteer: checkLegitRes?.volunteer || false,
          lookingForJob: false,
          activities: {
            pending: 0,
            approved: 0
          },
          role: user?.role ? user?.role : 'pending',
          dateCreated: Date.now(),
          region: checkLegitRes?.region || ''
        }

        await Users.doc(uid).set(newUser, { merge: true })

        dispatch({
          type: 'SIGNED_UP',
          payload: { ...newUser }
        })

        dispatch(setFeedback({
          type: 'success',
          msg: 'Welcome'
        }))
      } else {
        return dispatch(setFeedback({
          type: 'error',
          msg: 'userNotListedInConst'
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

export const signIn = ({ email, password }) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    const res = await app.auth().signInWithEmailAndPassword(email, password)
    const { uid } = res.user
    const snapshot = await Users.doc(uid).get()
    const { userInfo } = snapshot.data()
    const user = {
      uid,
      email,
      ...userInfo
    }
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

export const signUp = (user) => async dispatch => {
  const { tempToken } = store.getState().auth
  const { tokens } = store.getState().constants
  const region = tokens?.all[tempToken] || ''

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
      region,
      dateCreated: new Date()
    }
    await Users.doc(uid).set(newUser, { merge: true })
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

export const signOut = () => async dispatch => {
  try {
    app.auth().signOut()
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

export const setUserRegion = (region, uid) => async dispatch => {
  dispatch({
    type: 'AUTH_LOADING'
  })
  try {
    await Users.doc(uid).set({ region }, { merge: true })
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
