export const dialogLoading = () => async dispatch => {
  dispatch({ type: 'DIALOG_LOADING' })
}

export const openSigningIn = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'SIGNING_IN'
  })
}

export const openSigningUp = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'SIGNING_UP'
  })
}

export const openEditingProfile = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'EDITING_PROFILE'
  })
}

export const openSettings = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'OPEN_SETTINGS'
  })
}

export const openAddingJob = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'ADDING_JOB'
  })
}

export const openEditingJob = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'EDITING_JOB'
  })
}


export const openDatesFilterDialog = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'DATES_FILTER_DIALOG',
  })
}

export const openJobTypeFilterDialog = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'JOB_TYPE_FILTER_DIALOG'
  })
}

export const openLocationFilterDialog = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'LOCATION_FILTER_DIALOG'
  })
}

export const closeDialogs = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'CLOSE_DIALOGS'
  })
}

export const openSavedDialog = () => async dispatch => {
  dispatch(dialogLoading())
  dispatch({
    type: 'SAVED_JOBS_DIALOG'
  })
}
