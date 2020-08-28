const initialState = {
  filters: {},
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
    case 'SET_USERS':
      return {
        ...state,
        users: [...payload.users],
        loading: false
      }
    case 'SET_USERS_FILTER':
      return {
        ...state,
        filters: { ...payload.filter },
        loading: false
      }
    default: return state
  }
}
