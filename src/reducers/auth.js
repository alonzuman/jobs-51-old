const initialState = {
  authenticated: false,
  email: '',
  firstName: '',
  lastName: '',
  avatar: '',
  phone: '',
  skills: [],
  lookingForJob: false,
  activities: {
    pending: 0,
    approved: 0,
  },
  messagesSeen: [],
  loading: false
}

// Actions
export const LOADING = 'AUTH/LOADING';
export const SET_USER = 'AUTH/SET_USER';
export const SIGN_OUT = 'AUTH/SIGN_OUT';
export const ERROR = 'AUTH/ERROR';

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_USER:
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false
      }
    case SIGN_OUT:
    case ERROR:
      return {
        ...initialState,
        authenticated: false,
        loading: false
      }
    default: return state
  }
}
