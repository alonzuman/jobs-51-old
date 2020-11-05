const initialState = {
  regionManagers: [],
  region: {},

  activities: {
    all: [],
    isFetching: false,
    isFetched: false,
    isFetchingMore: false,
    isFetchedMore: false,
    isUpdating: false,
    isUpdated: false
  },

  regions: {
    isFetching: false,
    isFetched: false,
  },
}

// Actions
export const SET_MANAGERS = 'ACTIVITIES/SET_MANAGERS';

// New ones
export const FETCHING_ACTIVITIES = 'ACTIVITIES/FETCHING_ACTIVITIES';
export const FETCHING_MORE_ACTIVITIES = 'ACTIVITIES/FETCHING_MORE_ACTIVITIES';
export const SET_ACTIVITIES = 'ACTIVITIES/SET_ACTIVITIES';
export const SET_MORE_ACTIVITIES = 'ACTIVITIES/SET_MORE_ACTIVITIES';

export const UPDATING = 'ACTIVITIES/UPDATING';
export const ADD_ACTIVITY = 'ACTIVITIES/ADD_ACTIVITY';
export const DELETE_ACTIVITY = 'ACTIVITIES/DELETE_ACTIVITY';

export const FETCHING_REGION = 'ACTIVITIES/FETCHING_REGION';
export const SET_REGION = 'ACTIVITIES/SET_REGION';
export const ERROR = 'ACTIVITIES/ERROR';

export const activitiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCHING_ACTIVITIES:
      return {
        ...state,
        activities: {
          ...state.activities,
          isFetched: false,
          isFetching: true,
        }
      }

    case FETCHING_MORE_ACTIVITIES:
      return {
        ...state,
        activities: {
          ...state.activities,
          isFetched: true,
          isFetching: false,
          isFetchingMore: true,
          isFetchedMore: false
        }
      }

    case SET_ACTIVITIES:
      return {
        ...state,
        activities: {
          ...state.activities,
          ...payload,
          isFetched: true,
          isFetching: false,
        }
      }

    case SET_MORE_ACTIVITIES:
      return {
        ...state,
        activities: {
          all: [...state.activities.all, ...payload.all],
          isLastResult: payload.isLastResult,
          isFetching: false,
          isFetched: true,
          isFetchingMore: false,
          isFetchedMore: true
        }
      }

    case UPDATING:
      return {
        ...state,
        activities: {
          ...state.activities,
          isUpdating: true
        }
      }

    case ADD_ACTIVITY:
      return {
        ...state,
        activities: {
          all: [payload, ...state.activities.all],
          isUpdating: false,
          isUpdated: true
        }
      }

    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: {
          ...state.activities,
          all: [...state.activities.all.filter(v => v.id !== payload)],
          isUpdating: false,
          isUpdated: true
        }
      }

    case FETCHING_REGION:
      return {
        ...state,
        isFetchingRegion: true
      }

    case SET_MANAGERS:
      return {
        ...state,
        regionManagers: payload,
        loading: false,
        loadingManagers: false
      }
    case SET_REGION:
      return {
        ...state,
        ...payload,
        isFetchingRegion: false,
        isFetchedRegion: true
      }
    case ERROR:
      return {
        ...state,
        activities: {
          isUpdating: false,
          isUpdated: false,
          isFetched: false,
          isFetching: false,
        }
      }
    default: return state
  }
}
