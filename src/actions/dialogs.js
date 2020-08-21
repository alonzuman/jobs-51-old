export const dialogLoading = () => async dispatch => {
  dispatch({ type: 'DIALOG_LOADING' })
}

export const openDialog = ({ type, title }) => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'OPEN_DIALOG',
    payload: { type, title }
  })
}

export const closeDialogs = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'CLOSE_DIALOGS'
  })
}
