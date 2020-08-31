export const setFeedback = ({ msg, type }) => async dispatch => {
  dispatch({
    type: 'SET_FEEDBACK',
    payload: {
      msg,
      type
    }
  })
  setTimeout(() => {
    dispatch({ type: 'REMOVE_FEEDBACK' })
  }, 3000);
}

export const removeFeedback = () => async dispatch => {
  return {
    type: 'REMOVE_FEEDBACK'
  }
}
