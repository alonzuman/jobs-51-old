const initialState = {
  filters: {},
  user: {
    skills: [],
    lastPosition: ''
  },
  users: [],
  noMoreResults: false,
  loading: false,
  loadingMore: false,
  isUpdating: false,
  isDeleting: false
}

// Actions
export const LOADING = 'USERS/LOADING';
export const LOADING_MORE = 'USERS/LOADING_MORE';
export const NO_MORE_RESULTS = 'USERS/SET_NO_MORE_RESULTS';
export const UPDATING = 'USERS/UPDATING';
export const DELETING = 'USERS/DELETING';
export const ERROR = 'USERS/ERROR';
export const UPDATE_ONE = 'USERS/UPDATE_ONE';
export const DELETE_ONE = 'USERS/DELETE_ONE';
export const SET_ONE = 'USERS/SET_ONE';
export const SET_ALL = 'USERS/SET_ALL';
export const SET_MORE = 'USERS/SET_MORE';

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case LOADING_MORE:
      return {
        ...state,
        loadingMore: true
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
    case NO_MORE_RESULTS:
      return {
        ...state,
        noMoreResults: payload
      }
    case UPDATE_ONE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        },
        isUpdating: false
      }
    case DELETE_ONE:
      return {
        ...state,
        user: {},
        isDeleting: false
      }
    case SET_ONE:
      return {
        ...state,
        user: {
          ...payload
        },
        loading: false,
        isUpdating: false,
        isDeleting: false
      }
    case SET_MORE:
      return {
        ...state,
        users: [...state.users, ...payload.users],
        loading: false,
        loadingMore: false
      }
    case SET_ALL:
      return {
        ...state,
        users: [...payload.users],
        loading: false
      }
    case ERROR:
      return {
        ...state,
        isUpdating: false,
        isDeleting: false,
        loadingMore: false,
        loading: false
      }
    default: return state
  }
}
