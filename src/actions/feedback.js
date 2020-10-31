import { DELETE_ONE, SET_ONE } from "../reducers/feedback";

export const setFeedback = ({ msg, type }) => async dispatch => {
  dispatch({
    type: SET_ONE,
    payload: {
      msg,
      type
    }
  })
  setTimeout(() => {
    dispatch({ type: DELETE_ONE })
  }, 3000);
}

export const removeFeedback = () => async dispatch => {
  dispatch({
    type: DELETE_ONE
  })
}
