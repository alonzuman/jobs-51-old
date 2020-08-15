export const openSigningIn = () => async dispatch => {
  console.log('opening')
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

export const closeDialogs = () => async dispatch => {
  dispatch({
    type: 'CLOSE_DIALOGS'
  })
}

export const setJob = (job) => async dispatch => {
  dispatch ({
    type: 'SET_JOB',
    payload: { job }
  })
}
