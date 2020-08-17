export const openSigningIn = () => async dispatch => {
  dispatch({
    type: 'SIGNING_IN'
  })
}

export const openSigningUp = () => async dispatch => {
  dispatch({
    type: 'SIGNING_UP'
  })
}

export const openEditingProfile = () => async dispatch => {
  dispatch({
    type: 'EDITING_PROFILE'
  })
}

export const openSettings = () => async dispatch => {
  dispatch({
    type: 'OPEN_SETTINGS'
  })
}

export const openAddingJob = () => async dispatch => {
  dispatch({
    type: 'ADDING_JOB'
  })
}

export const openEditingJob = () => async dispatch => {
  dispatch({
    type: 'EDITING_JOB'
  })
}


export const openDatesFilterDialog = () => async dispatch => {
  dispatch({
    type: 'DATES_FILTER_DIALOG',
  })
}

export const openJobTypeFilterDialog = () => async dispatch => {
  dispatch({
    type: 'JOB_TYPE_FILTER_DIALOG'
  })
}

export const openLocationFilterDialog = () => async dispatch => {
  dispatch({
    type: 'LOCATION_FILTER_DIALOG'
  })
}

export const closeDialogs = () => async dispatch => {
  dispatch({
    type: 'CLOSE_DIALOGS'
  })
}

export const openSavedDialog = () => async dispatch => dispatch({ type: 'SAVED_JOBS_DIALOG' })
