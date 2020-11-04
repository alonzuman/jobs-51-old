const initialState = {
  isFetching: false,
  isFetched: false,
  isUpdating: false,
  isUpdated: false,
  isDeleting: false,
  isDeleted: false,

  stats: {},
  listedMembers: [],
  locations: [],
  regions: []
}

// Actions
export const FETCHING = 'CONSTANTS/FETCHING';
export const UPDATING = 'CONSTANTS/UPDATING';
export const DELETING = 'CONSTANTS/DELETING';
export const SET_ALL = 'CONSTANTS/SET_ALL';
export const UPDATE_ALL = 'CONSTANTS/UPDATE_ALL';

// New methods
export const SET_DATA = 'CONSTANTS/SET_DATA';
export const ADD_ACTIVITY_TYPE = 'CONSTANTS/ADD_ACTIVITY_TYPE';
export const DELETE_ACTIVITY_TYPE = 'CONSTANTS/DELETE_ACTIVITY_TYPE';
export const ERROR = 'CONSTANTS/ERROR'

export const constantsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCHING:
      return {
        ...state,
        isFetched: false,
        isFetching: true,
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
    case SET_ALL:
      return {
        ...state,
        ...payload,
        isFetching: false,
        isFetched: true,

        // All fields
        listedMembers: [],
        locations: [],
        regions: []

      }
    case UPDATE_ALL:
      return {
        ...state,
        ...payload,
        isUpdating: false,
        isUpdated: true
      }

    // New methods, change to SET_ALL
    case SET_DATA:
      return {
        ...state,
        ...payload,
        isFetching: false,
        isFetched: true
      }
    case ADD_ACTIVITY_TYPE:
      return {
        ...state,
        activityTypes: {
          all: [...state.activityTypes.all, payload]
        },
        isUpdating: false,
      }
    case DELETE_ACTIVITY_TYPE:
      return {
        ...state,
        activityTypes: {
          all: [...state.activityTypes.all.filter(v => v !== payload)]
        },
        isDeleting: false,
      }
    case ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isUpdating: false,
        isDeleting: false,
      }
    default: return state;
  }
}
