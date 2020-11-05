const initialState = {
  isAuthenticated: false,
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
  isFetching: false,
  isFetched: false,
}

// Actions
export const FETCHING = 'AUTH/FETCHING';
export const FETCHED = 'AUTH/FETCHED';
export const SET_USER = 'AUTH/SET_USER';
export const UPDATE_MY_USER = 'AUTH/UPDATE_MY_USER'
export const SIGN_OUT = 'AUTH/SIGN_OUT';
export const ERROR = 'AUTH/ERROR';

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCHING:
      return {
        ...state,
        isFetched: false,
        isFetching: true
      }
    case UPDATE_MY_USER:
    case SET_USER:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isFetching: false,
        isFetched: true
      }
    case SIGN_OUT:
    case ERROR:
      return {
        ...initialState,
        isFetching: false,
        isFetched: true,
      }
    default: return state
  }
}
