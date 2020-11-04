import { db } from "../firebase";
import { ADD_ACTIVITY_TYPE, DELETE_ACTIVITY_TYPE, DELETING, ERROR, FETCHING, SET_ALL, SET_DATA, UPDATING } from "../reducers/constants";
import { setFeedback } from "./feedback";
import firebase from 'firebase'
import store from '../store'
const { translation } = store.getState().theme
const Constants = db.collection('constants')

export const getConstants = () => async dispatch => {
  dispatch({
    type: FETCHING
  })
  try {
    const snapshot = await Constants.get()
    let results = {}
    snapshot.forEach(doc => results[doc.id] = doc.data())
    dispatch({
      type: SET_ALL,
      payload: results
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR
    })
    dispatch(setFeedback({
      type: 'error',
      msg: translation.serverError
    }))
  }
}

export const deleteActivityType = activity => async dispatch => {
  dispatch({
    type: DELETING
  })
  try {
    await Constants.doc('activityTypes').update({
      all: firebase.firestore.FieldValue.arrayRemove(activity)
    })
    dispatch({
      type: DELETE_ACTIVITY_TYPE,
      payload: activity
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

export const addActivityType = newActivity => async dispatch => {
  dispatch({
    type: UPDATING
  })
  try {
    await Constants.doc('activityTypes').update({
      all: firebase.firestore.FieldValue.arrayUnion(newActivity)
    })
    dispatch({
      type: ADD_ACTIVITY_TYPE,
      payload: newActivity
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

export const getListedMembers = () => async dispatch => {
  dispatch({
    type: FETCHING
  })

  try {
    const membersSnapshot = await Constants.doc('listedMembers').get()
    const { all } = membersSnapshot.data()
    dispatch({
      type: SET_DATA,
      payload: { listedMembers: all }
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

export const getLocations = () => async dispatch => {
  dispatch({
    type: FETCHING
  })

  try {
    const locations = await Constants.doc('locations').get();
    const { regions, all } = locations.data();

    dispatch({
      type: SET_DATA,
      payload: { regions, locations: all }
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

// TODO ALON get activity types

// TODO ALON get skills

// TODO ALON get industries

// TODO ALON get listedJobLoactions

// TODO ALON get listedJobSkills

// TODO ALON fix the region Managers section over threre
