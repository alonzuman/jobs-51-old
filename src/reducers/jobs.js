const initialState = {
  job: {},
  jobs: [],
  savedJobs: [],
  savedJobsLoading: false,
  loading: false,
  isUpdating: false,
  isDeleting: false
}

export const jobsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SAVED_JOBS_LOADING':
      return {
        ...state,
        savedJobsLoading: true
      }
    case 'JOB_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'JOB_UPDATING':
      return {
        ...state,
        isUpdating: true
      }
    case 'JOB_DELETING':
      return {
        ...state,
        isDeleting: true
      }
    case 'JOB_ERROR':
      return {
        ...state,
        loading: false
      }
    case 'SET_JOB':
      return {
        ...state,
        job: payload.job,
        loading: false,
        isDeleting: false,
        isUpdating: false
      }
    case 'SET_JOBS':
      return {
        ...state,
        jobs: [...payload.jobs],
        loading: false
      }
    case 'SET_SAVED_JOBS':
      return {
        ...state,
        savedJobs: [...payload.jobs],
        savedJobsLoading: false
      }
    case 'ADD_JOB':
      return {
        jobs: [...state.jobs, payload.job],
        loading: false
      }
    case 'JOB_FAIL':
      return {
        ...state,
        loading: false
      }
    case 'EMPTY_JOBS':
      return {
        ...initialState
      }
    case 'JOB_DELETED':
      return {
        jobs: [...state.jobs.filter(job => job.id !== payload.id)],
        loading: false
      }
    case 'REMOVE_SAVED_JOB':
      return {
        ...state,
        savedJobs: [...state.savedJobs.filter(job => job.id !== payload.id)],
        loading: false
      }
    default: return state
  }
}
