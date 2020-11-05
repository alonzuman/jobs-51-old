const initialState = {
  stats: {
    isFetching: false,
    isFetched: false,
    all: {}
  },

  listedMembers: {
    isFetching: false,
    isFetched: false,
    all: []
  },

  locations: {
    isFetching: false,
    isFetched: false,
    all: [],
    regions: [],
  },

  activityTypes: {
    isFetching: false,
    isFetched: false,
    isUpdating: false,
    isUpdated: false,
    all: []
  }
}

// Actions
// Stats
export const FETCHING_STATS = 'CONSTANTS/FETCHING_STATS';
export const FETCHING_LISTED_MEMBERS = 'CONSTANTS/FETCHING_LISTED_MEMBERS';
export const FETCHING_LOCATIONS = 'CONSTANTS/FETCHING_LOCATIONS';
export const FETCHING_ACTIVITY_TYPES = 'CONSTANTS/FETCHING_ACTIVITY_TYPES';

export const SET_STATS = 'CONSTANTS/SET_STATS';
export const SET_LISTED_MEMBERS = 'CONSTANTS/SET_LISTED_MEMBERS';
export const SET_LOCATIONS = 'CONSTANTS/SET_LOCATIONS';
export const SET_ACTIVITY_TYPES = 'CONSTANTS/SET_ACTIVITY_TYPES';

export const UPDATING_ACTIVITY_TYPES = 'CONSTANTS/UPDATING_ACTIVITY_TYPES';

export const ADDED_ACTIVITY_TYPE = 'CONSTANTS/ADDED_ACTIVITY_TYPE';
export const DELETED_ACTIVITY_TYPE = 'CONSTANTS/DELETED_ACTIVITY_TYPE';

export const ERROR = 'CONSTANTS/ERROR'

export const constantsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCHING_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          isFetched: false,
          isFetching: true
        }
      }
    case FETCHING_LISTED_MEMBERS:
      return {
        ...state,
        listedMembers: {
          ...state.listedMembers,
          isFetched: false,
          isFetching: true
        }
      }
    case FETCHING_LOCATIONS:
      return {
        ...state,
        locations: {
          ...state.locations,
          isFetched: false,
          isFetching: true
        }
      }
    case FETCHING_ACTIVITY_TYPES:
      return {
        ...state,
        activityTypes: {
          ...state.activityTypes,
          isFetched: false,
          isFetching: true
        }
      }

    case SET_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...payload.stats,
          isFetching: false,
          isFetched: true
        }
      }
    case SET_LISTED_MEMBERS:
      return {
        ...state,
        listedMembers: {
          ...state.listedMembers,
          ...payload.listedMembers,
          isFetching: false,
          isFetched: true
        }
      }
    case SET_LOCATIONS:
      return {
        ...state,
        locations: {
          ...state.locations,
          ...payload.locations,
          isFetching: false,
          isFetched: true
        }
      }
    case SET_ACTIVITY_TYPES:
      return {
        ...state,
        activityTypes: {
          ...state.activityTypes,
          ...payload.activityTypes,
          isFetching: false,
          isFetched: true
        }
      }

    case UPDATING_ACTIVITY_TYPES:
      return {
        ...state,
        activityTypes: {
          ...state.activityTypes,
          isUpdated: false,
          isUpdating: true
        }
      }

    case ADDED_ACTIVITY_TYPE:
      return {
        ...state,
        activityTypes: {
          ...state.activityTypes,
          all: [...state.activityTypes.all, payload],
          isUpdating: false,
          isUpdated: true
        },
      }
    case DELETED_ACTIVITY_TYPE:
      return {
        ...state,
        activityTypes: {
          ...state.activityTypes,
          all: [...state.activityTypes.all.filter(v => v !== payload)],
          isUpdating: false,
          isUpdated: true
        },
      }
    case ERROR:
      return {
        ...state,
        stats: {
          ...state.stats,
          isFetching: false,
          isFetched: false,
        },
        listedMembers: {
          ...state.listedMembers,
          isFetching: false,
          isFetched: false
        },
        locations: {
          ...state.locations,
          isFetching: false,
          isFetched: false
        },
        activityTypes: {
          ...state.activityTypes,
          isFetching: false,
          isFetched: false,
          isUpdating: false,
          isUpdated: false,
        }
      }
    default: return state;
  }
}
