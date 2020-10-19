import { db } from "../firebase";
import { setFeedback } from "./feedback";

export const getConstants = () => async dispatch => {
  dispatch({
    type: 'CONSTANTS_LOADING'
  })
  try {
    const snapshot = await db.collection('constants').get()
    let results = {}
    snapshot.forEach(doc => results[doc.id] = doc.data())
    dispatch({
      type: 'SET_ALL_CONSTANTS',
      payload: results
    })
  } catch (error) {
    console.log(error);
    dispatch(setFeedback({
      type: 'error',
      msg: 'ServerError'
    }))
  }
}
