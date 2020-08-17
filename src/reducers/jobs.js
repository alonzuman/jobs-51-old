const initialState = {
  job: {},
  jobs: [],
  jobTypes: [],
  loading: false
}

export const jobsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
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
        job: payload.job
      }
    case 'SET_JOBS':
      return {
        jobs: [...payload.jobs],
        loading: false
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
        loading: false
      }
    case 'JOB_FAIL':
      return {
        ...state,
        loading: false
      }
    case 'REMOVE_JOB':
      return {
        jobs: [...state.jobs.filter(job => job.id !== payload.id)],
        loading: false
      }
    default: return state
  }
}
