const initialState = {
  jobs: [],
  loading: false
}

export const savedReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SAVED_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'SET_SAVED':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'REMOVE_SAVED':
      return {
        ...state,
        jobs: [...state.jobs.filter(v => v.id !== payload.id)],
        loading: false
      }
    case 'ADD_SAVED':
      return {
        ...state,
        jobs: [...state.jobs, payload],
        loading: false
      }
    case 'SAVED_ERROR':
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}
