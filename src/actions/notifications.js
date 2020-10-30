import { db } from '../firebase'
import { ERROR, LOADING, SET_ALL } from '../reducers/notifications'
import { setFeedback } from './feedback'
const Notifications = db.collection('notifications');

export const getNotifications = uid => async dispatch => {
  dispatch({
    type: LOADING
  })

  try {
    const snapshot = await Notifications.where('uid', '==', uid).get()
    let notifications;
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
      msg: 'ServerError'
    }))
  }
}
