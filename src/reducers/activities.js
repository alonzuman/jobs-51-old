const initialState = {
  activities: [],
  types: [],
  filters: {},
  view: 'grid',
  currentUid: '',
  regions: [],
  regionManagers: [],
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
        activities: [payload.newActivity, ...state.activities],
        loading: false
      }
    case 'CLEAR_ACTIVITIES':
      return {
        ...state,
        activities: []
      }
    case 'SET_ACTIVITIES':
      return {
        ...state,
        ...payload,
        loading: false
      }
    case 'SET_ACTIVITY_TYPES':
      return {
        ...state,
        types: [...payload.types],
        loading: false
      }
    case 'REMOVE_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities.filter(activity => activity.id !== payload)]
      }
    case 'SET_ACTIVITY_FILTERS':
      return {
        ...state,
        filters: {...state.filters, ...payload },
        loading: false
      }
    case 'CLEAR_ACTIVITY_FILTERS':
      return {
        ...state,
        filters: {},
        loading: false
      }
    case 'CHANGE_VIEW':
      return {
        ...state,
        view: payload
      }
    case 'ACITIVITIES_STOP_LOADING':
      return {
        ...state,
        loading: false
      }
    default: return state
  }
}
