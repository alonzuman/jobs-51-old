import { db } from '../firebase'
import { ERROR, LOADING, MARK_SEEN, SET_ALL } from '../reducers/notifications'
import { setFeedback } from './feedback'
import store from '../store'
const { translation } = store.getState().theme
const Notifications = db.collection('notifications');

export const getNotifications = uid => async dispatch => {
  dispatch({
    type: LOADING
  })

  try {
    const snapshot = await Notifications.where('uid', '==', uid).orderBy('dateCreated', 'desc').get()
    let notifications = [];
    snapshot.forEach(doc => notifications.push({ id: doc.id, ...doc.data() }))
    dispatch({
      type: SET_ALL,
      payload: notifications
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

export const markSeen = (notification) => async dispatch => {
  try {
    await Notifications.doc(notification.id).update({
      seen: true
    })
    dispatch({
      type: MARK_SEEN,
      payload: notification
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
