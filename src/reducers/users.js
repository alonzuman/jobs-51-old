const initialState = {
  filters: {},
  user: {},
  users: [],
  loading: false
}

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'USERS_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'USER_STOP_LOADING':
      return {
        ...state,
        loading: false
      }
    case 'SET_USER_PAGE':
      return {
        ...state,
        user: { ...payload },
        loading: false
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
