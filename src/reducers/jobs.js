const initialState = {
  job: {},
  jobs: [],
  savedJobs: [],
  savedJobsLoading: false,
  filters: {},
  loading: false,
  filtersLoading: false
}

export const jobsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'JOB_FILTERS_LOADING':
      return {
        ...state,
        filtersLoading: true
      }
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {}
      }
    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload.filters
        },
        loading: false
      }
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
    case 'JOB_ERROR':
      return {
        ...state,
        loading: false
      }
    case 'SET_JOB':
      return {
        ...state,
        job: payload.job,
        loading: false
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
    case 'SET_JOB_TYPES':
      return {
        ...state,
        jobTypes: payload.jobTypes,
        filtersLoading: false
      }
    case 'SET_JOB_LOCATIONS':
      return {
        ...state,
        jobLocations: payload.jobLocations,
        filtersLoading: false
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
    case 'REMOVE_JOB':
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
