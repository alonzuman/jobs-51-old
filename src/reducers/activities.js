const initialState = {
  activities: [],
  currentUid: '',
  regionManagers: [],
  loading: false,
  loadingManagers: false,
}

// Actions
export const LOADING = 'ACTIVITIES/LOADING';
export const LOADING_MANAGERS = 'ACTIVITIES/LOADING_MANAGERS';
export const ADD_ONE = 'ACTIVITIES/ADD_ONE';
export const SET_ALL = 'ACTIVITIES/SET_ALL';
export const SET_MANAGERS = 'ACTIVITIES/SET_MANAGERS';
export const DELETE_ONE = 'ACTIVITIES/DELETE_ONE';
export const CLEAR_ALL = 'ACTIVITIES/CLEAR_ALL';
export const ERROR = 'ACTIVITIES/ERROR';

export const activitiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case LOADING_MANAGERS:
      return {
        ...state,
        loadingManagers: true
      }
    case ADD_ONE:
      return {
        ...state,
        activities: [payload.newActivity, ...state.activities],
        loading: false
      }
    case CLEAR_ALL:
      return {
        ...state,
        activities: []
      }
    case SET_ALL:
      return {
        ...state,
        ...payload,
        loading: false
      }
    case SET_MANAGERS:
      return {
        ...state,
        regionManagers: payload,
        loading: false,
        loadingManagers: false
      }
    case DELETE_ONE:
      return {
        ...state,
        activities: [...state.activities.filter(activity => activity.id !== payload)]
      }
    case ERROR:
      return {
        ...state,
        loadingManagers: false,
        loading: false
      }
    default: return state
  }
}
