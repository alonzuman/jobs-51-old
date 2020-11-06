import { db } from "../firebase";
import { setFeedback } from "./feedback";
import firebase from 'firebase'
import store from '../store'
import { ADDED_ACTIVITY_TYPE, ADDED_REGION, DELETED_ACTIVITY_TYPE, DELETED_REGION, DELETING_REGION, ERROR, FETCHING_ACTIVITY_TYPES, FETCHING_LISTED_MEMBERS, FETCHING_LOCATIONS, FETCHING_STATS, SET_ACTIVITY_TYPES, SET_LISTED_MEMBERS, SET_LOCATIONS, SET_STATS, UPDATING_ACTIVITY_TYPES, UPDATING_LOCATIONS } from "../reducers/constants";
const { translation } = store.getState().theme
const Constants = db.collection('constants')

export const deleteRegion = region => async dispatch => {
  dispatch({
    type: DELETING_REGION
  })
  try {
    // TODO ALON send to back
    await Constants.doc('locations').set({
      regions: firebase.firestore.FieldValue.arrayRemove(region)
    }, { merge: true })
    dispatch({
      type: DELETED_REGION,
      payload: region
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

export const addRegion = region => async dispatch => {
  dispatch({
    type: UPDATING_LOCATIONS
  })
  try {
    await Constants.doc('locations').set({
      regions: firebase.firestore.FieldValue.arrayUnion(region)
    }, { merge: true })
    dispatch({
      type: ADDED_REGION,
      payload: region
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

export const deleteActivityType = activity => async dispatch => {
  dispatch({
    type: UPDATING_ACTIVITY_TYPES
  })
  try {
    await Constants.doc('activityTypes').update({
      all: firebase.firestore.FieldValue.arrayRemove(activity)
    })
    dispatch({
      type: DELETED_ACTIVITY_TYPE,
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
    type: UPDATING_ACTIVITY_TYPES
  })
  try {
    await Constants.doc('activityTypes').update({
      all: firebase.firestore.FieldValue.arrayUnion(newActivity)
    })
    dispatch({
      type: ADDED_ACTIVITY_TYPE,
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
    type: FETCHING_LISTED_MEMBERS
  })

  try {
    const membersSnapshot = await Constants.doc('listedMembers').get()
    const { all } = membersSnapshot.data()
    dispatch({
      type: SET_LISTED_MEMBERS,
      payload: {
        all
      }
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
    type: FETCHING_LOCATIONS
  })

  try {
    const locations = await Constants.doc('locations').get();
    const { regions, all } = locations.data();

    dispatch({
      type: SET_LOCATIONS,
      payload: {
        all,
        regions
      }
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

export const getStats = () => async dispatch => {
  dispatch({
    type: FETCHING_STATS
  })
  try {
    const statsSnapshot = await Constants.doc('stats').get()
    const all = statsSnapshot.data()
    dispatch({
      type: SET_STATS,
      payload: {
        all
      }
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

export const getActivityTypes = () => async dispatch => {
  dispatch({
    type: FETCHING_ACTIVITY_TYPES
  })
  try {
    const activityTypesSnapshot = await Constants.doc('activityTypes').get()
    const activityTypes = activityTypesSnapshot.data()
    dispatch({
      type: SET_ACTIVITY_TYPES,
      payload: { activityTypes }
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
