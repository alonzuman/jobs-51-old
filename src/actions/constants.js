import { db } from "../firebase";
import { ERROR, LOADING, SET_ALL } from "../reducers/constants";
import { setFeedback } from "./feedback";

export const getConstants = () => async dispatch => {
  dispatch({
    type: LOADING
  })
  try {
    const snapshot = await db.collection('constants').get()
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
      msg: 'ServerError'
    }))
  }
}
