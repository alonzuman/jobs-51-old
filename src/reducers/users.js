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

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'USERS_LOADING_MORE':
      return {
        ...state,
        loadingMore: true
      }
    case 'SET_NO_MORE_RESULTS':
      return {
        ...state,
        noMoreResults: payload
      }
    case 'USERS_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'USERS_UPDATING':
      return {
        ...state,
        isUpdating: true
      }
    case 'USERS_DELETING':
      return {
        ...state,
        isDeleting: true
      }
    case 'USER_STOP_LOADING':
      return {
        ...state,
        loading: false
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        },
        isUpdating: false
      }
    case 'DELETE_USER':
      return {
        ...state,
        user: {},
        isDeleting: false
      }
    case 'SET_USER_PAGE':
      return {
        ...state,
        user: {
          ...payload
        },
        loading: false,
        isUpdating: false,
        isDeleting: false
      }
    case 'TOGGLE_VOLUNTEER':
      return {
        ...state,
        user: {
          ...state.user,
          volunteer: payload.currentValue
        }
      }
    case 'SET_MORE_USERS':
      return {
        ...state,
        users: [...state.users, ...payload.users],
        loading: false,
        loadingMore: false
      }
    case 'SET_USERS':
      return {
        ...state,
        users: [...payload.users],
        loading: false
      }
    case 'SET_USERS_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...payload },
        loading: false
      }
    case 'CLEAR_USERS_FILTERS':
      return {
        ...state,
        filters: {},
        loading: false
      }
    default: return state
  }
}
