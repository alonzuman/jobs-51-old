const initialState = {
  signingIn: false,
  signingUp: false,
  editingProfile: false,
  settings: false,
  addingJob: false,
  editingJob: false,
  datesFilter: false,
  jobTypeFilter: false,
  locationFilter: false
}

export const dialogsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SIGNING_IN':
      return {
        ...state,
        signingIn: true
      }
    case 'SIGNING_UP':
      return {
        ...state,
        signingUp: true
      }
    case 'EDITING_PROFILE':
      return {
        ...state,
        editingProfile: true
      }
    case 'OPEN_SETTINGS':
      return {
        ...state,
        settings: true
      }
    case 'ADDING_JOB':
      return {
        ...state,
        addingJob: true
      }
    case 'EDITING_JOB':
      return {
        ...state,
        editingJob: true
      }
    case 'DATES_FILTER_DIALOG':
      return {
        ...state,
        datesFilter: true
      }
    case 'JOB_TYPE_FILTER_DIALOG':
      return {
        ...state,
        jobTypeFilter: true
      }
    case 'LOCATION_FILTER_DIALOG':
      return {
        ...state,
        locationFilter: true
      }
    case 'CLOSE_DIALOGS':
      return {
        ...initialState
      }
    default: return state
  }
}
