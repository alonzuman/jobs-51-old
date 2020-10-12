const initialState = {
  authenticated: false,
  email: '',
  firstName: '',
  lastName: '',
  avatar: '',
  phone: '',
  savedJobs: [],
  lookingForJob: false,
  activities: {
    pending: 0,
    approved: 0,
  },
  loading: false
}

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'AUTH_FAIL':
      return {
        ...initialState,
        loading: false
      }
    case 'UPDATED_PROFILE':
    case 'SIGNED_UP':
    case 'SIGNED_IN':
    case 'SET_USER':
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false
      }
    case 'SAVE_JOB':
      return {
        ...state,
        savedJobs: [...state.savedJobs, payload.jobId]
      }
    case 'UNSAVE_JOB':
      return {
        ...state,
        savedJobs: [...state.savedJobs.filter(job => job !== payload.jobId)]
      }
    case 'SET_TEMP_TOKEN':
      return {
        ...state,
        tempToken: payload
      }
    case 'NOT_SIGNED_IN':
      return initialState
    case 'SIGN_OUT':
      return {
        ...initialState,
        authenticated: false,
        loading: false
      }
    default: return state
  }
}
