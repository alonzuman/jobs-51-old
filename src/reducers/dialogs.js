// TODO change payload to type of dialog then only dispatch 'opendialog(type of dialog)'

const initialState = {
  signingIn: false,
  signingUp: false,
  editingProfile: false,
  settings: false,
  addingJob: false,
  editingJob: false,
  datesFilter: false,
  jobTypeFilter: false,
  locationFilter: false,
  savedJobs: false,
  loading: true
}

export const dialogsReducer = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case 'DIALOG_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'SIGNING_IN':
      return {
        ...state,
        signingIn: true,
        loading: false
      }
    case 'SIGNING_UP':
      return {
        ...state,
        signingUp: true,
        loading: false
      }
    case 'EDITING_PROFILE':
      return {
        ...state,
        editingProfile: true,
        loading: false
      }
    case 'SAVED_JOBS_DIALOG':
      return {
        ...state,
        savedJobs: true,
        loading: false
      }
    case 'OPEN_SETTINGS':
      return {
        ...state,
        settings: true,
        loading: false
      }
    case 'ADDING_JOB':
      return {
        ...state,
        addingJob: true,
        loading: false
      }
    case 'EDITING_JOB':
      return {
        ...state,
        editingJob: true,
        loading: false
      }
    case 'DATES_FILTER_DIALOG':
      return {
        ...state,
        datesFilter: true,
        loading: false
      }
    case 'JOB_TYPE_FILTER_DIALOG':
      return {
        ...state,
        jobTypeFilter: true,
        loading: false
      }
    case 'LOCATION_FILTER_DIALOG':
      return {
        ...state,
        locationFilter: true,
        loading: false
      }
    case 'CLOSE_DIALOGS':
      return {
        ...initialState
      }
    default: return state
  }
}
