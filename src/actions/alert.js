export const clearAlert = () => async dispatch => {
  dispatch({
    type: 'CLEAR_ALERT'
  })
}

export const setAlert = ({ msg, type }) => async dispatch => {
  dispatch({
    type: 'SET_ALERT',
    payload: {
      msg,
      type
    }
  })
  setTimeout(() => {
    clearAlert()
  }, 3000);
}
