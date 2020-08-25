const initialState = {
  activities: [],
  types: [],
  loading: false
}

export const activitiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ACTIVITY_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, payload.newActivity],
        loading: false
      }
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: [...payload.activities],
        loading: false
      }
    case 'SET_ACTIVITY_TYPES':
      return {
        ...state,
        types: [...payload.types],
        loading: false
      }
    default: return state
  }
}
