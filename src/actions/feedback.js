import { DELETE_ONE, SET_ONE } from "../reducers/feedback";
import store from "../store";

export const setFeedback = ({ msg, type }) => async dispatch => {
  const { msg: currentMsg } = store.getState().feedback
  dispatch({
    type: SET_ONE,
    payload: {
      msg,
      type
    }
  })
  setTimeout(() => {
    dispatch({
      type: DELETE_ONE
    })
  }, 3000);
}

export const removeFeedback = () => async dispatch => {
  dispatch({
    type: DELETE_ONE
  })
}
