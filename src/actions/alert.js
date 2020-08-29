export const clearAlert = () => async dispatch => {
  dispatch({
    type: 'CLEAR_ALERT',
    payload: {
      isOn: false
    }
  })
}

export const setAlert = ({ msg, type }) => async dispatch => {
  dispatch({
    type: 'SET_ALERT',
    payload: {
      isOn: true,
      msg,
      type
    }
  })
  // setTimeout(() => { dispatch(clearAlert()) }, 4000);
}
