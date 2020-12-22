const initialState = {
  job: {},
  jobs: [],
  savedJobs: [],
  query: {},
  loading: false,
  isFetching: false,
  isFetched: false,
  isFetchingMore: false,
  isFetchedMore: false,
  isAdding: false,
  isAdded: false,
  isUpdating: false,
  isUpdated: false,
  isDeleting: false,
  isDeleted: false,
}

// Actions
export const LOADING = 'JOBS/LOADING';
export const FETCHING_JOBS = 'JOBS/FETCHING_JOBS'
export const FETCHING_MORE_JOBS = 'JOBS/FETCHING_MORE_JOBS'
export const ADDING_JOB = 'JOBS/ADDING_JOB'
export const UPDATING = 'JOBS/UPDATING';
export const DELETING = 'JOBS/DELETING';
export const ERROR = 'JOBS/ERROR';

export const SET_ONE = 'JOBS/SET_ONE'
export const SET_ALL = 'JOBS/SET_ALL'
export const SET_MORE_JOBS = 'JOBS/SET_MORE_JOBS';
export const SET_SAVED_JOBS = 'JOBS/SET_SAVED_JOBS';

export const ADD_ONE = 'JOBS/ADD_ONE';
export const ADD_SAVED_ONE = 'JOBS/ADD_SAVED_ONE';
export const DELETE_SAVED_ONE = 'JOBS/DELETE_SAVED_ONE';
export const DELETE_ONE = 'JOBS/DELETE_ONE';
export const EMPTY_ALL = 'JOBS/EMPTY_ALL';


export const jobsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCHING_MORE_JOBS:
      return {
        ...state,
        isFetchingMore: true,
        isFetchedMore: false
      }
    case FETCHING_JOBS:
      return {
        ...state,
        isFetching: true,
        isFetched: false
      }
    case ADDING_JOB:
      return {
        ...state,
        isAdding: true,
        isAdded: false
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case UPDATING:
      return {
        ...state,
        isUpdating: true
      }
    case DELETING:
      return {
        ...state,
        isDeleting: true
      }
    case SET_ONE:
      return {
        ...state,
        job: { ...payload },
        loading: false,
        isDeleting: false,
        isUpdating: false
      }
    case SET_ALL:
      return {
        ...state,
        query: payload.query,
        jobs: [...payload.jobs],
        loading: false,
        isFetching: false,
        isFetched: true,
        isFetchingMore: false,
        isFetchedMore: true
      }
    case SET_MORE_JOBS:
      return {
        ...state,
        query: payload.query,
        jobs: [...state.jobs, ...payload.moreJobs],
        isFetching: false,
        isFetched: true,
        isFetchingMore: false,
        isFetchedMore: true
      }
    case SET_SAVED_JOBS:
      return {
        ...state,
        savedJobs: [...payload.jobs],
        isFetching: false,
        isFetched: true
      }
    case ADD_ONE:
      return {
        jobs: [...state.jobs, payload.job],
        isAdding: false,
        isAdded: true
      }
    case EMPTY_ALL:
      return {
        ...initialState
      }
    case DELETE_ONE:
      return {
        jobs: [...state.jobs.filter(job => job.id !== payload.id)],
        loading: false
      }
    case ADD_SAVED_ONE:
      return {
        ...state,
        savedJobs: [...state?.savedJobs, payload],
        loading: false
      }
    case DELETE_SAVED_ONE:
      return {
        ...state,
        savedJobs: [...state.savedJobs.filter(job => job.id !== payload)],
        loading: false
      }
    case ERROR:
    default: return state
  }
}
