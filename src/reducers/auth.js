const initialState = {
  authenticated: false,
  email: '',
  firstName: '',
  lastName: '',
  avatar: '',
  phone: '',
  savedJobs: [],
  loading: false
}

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        authenticated: true,
        loading: true
      }
    case 'UPDATED_PROFILE':
    case 'SIGNED_UP':
    case 'SIGNED_IN':
    case 'SET_USER':
      return {
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
    case 'NOT_SIGNED_IN':
      return initialState
    case 'SIGN_OUT':
      return {
        ...state,
        authenticated: false,
        loading: false
      }
    default: return state
  }
}
