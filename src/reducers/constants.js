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
    isUpdating: false,
    isUpdated: false,
    isDeleting: false,
    isDeleted: false,
    all: [],
    regions: [],
  },

  activityTypes: {
    isFetching: false,
    isFetched: false,
    isUpdating: false,
    isUpdated: false,
    all: []
  },

  skills: {
    isFetching: false,
    isFetched: false,
    all: []
  },

  jobIndustries: {
    isFetching: false,
    isFetched: false,
    all: []
  },

  listedJobLocations: {
    isFetching: false,
    isFetched: false,
    all: {}
  },

  listedJobSkills: {
    isFetching: false,
    isFetched: false,
    all: {}
  },
}

// Actions
export const FETCHING_STATS = 'CONSTANTS/FETCHING_STATS';
export const FETCHING_LISTED_MEMBERS = 'CONSTANTS/FETCHING_LISTED_MEMBERS';
export const FETCHING_LOCATIONS = 'CONSTANTS/FETCHING_LOCATIONS';
export const FETCHING_ACTIVITY_TYPES = 'CONSTANTS/FETCHING_ACTIVITY_TYPES';
export const FETCHING_SKILLS = 'CONSTANTS/FETCHING_SKILLS';
export const FETCHING_JOB_INDUSTRIES = 'CONSTANTS/FETCHING_JOB_INDUSTRIES';
export const FETCHING_LISTED_JOB_LOCATIONS = 'CONSTANTS/FETCHING_LISTED_JOB_LOCATIONS';
export const FETCHING_LISTED_JOB_SKILLS = 'CONSTANTS/FETCHING_LISTED_JOB_SKILLS';

export const SET_STATS = 'CONSTANTS/SET_STATS';
export const SET_LISTED_MEMBERS = 'CONSTANTS/SET_LISTED_MEMBERS';
export const SET_LOCATIONS = 'CONSTANTS/SET_LOCATIONS';
export const SET_SKILLS = 'CONSTANTS/SET_SKILLS';
export const SET_ACTIVITY_TYPES = 'CONSTANTS/SET_ACTIVITY_TYPES';
export const SET_JOB_INDUSTRIES = 'CONSTANTS/SET_JOB_INDUSTRIES';
export const SET_LISTED_JOB_LOCATIONS = 'CONSTANTS/SET_LISTED_JOB_LOCATIONS';
export const SET_LISTED_JOB_SKILLS = 'CONSTANTS/SET_LISTED_JOB_SKILLS';

export const UPDATING_ACTIVITY_TYPES = 'CONSTANTS/UPDATING_ACTIVITY_TYPES';
export const UPDATING_LOCATIONS = 'CONSTANTS/UPDATING_LOCATIONS';

export const DELETING_REGION = 'CONSTANTS/DELETING_REGION';
export const DELETED_REGION = 'CONSTANTS/DELETED_REGION';
export const DELETED_ACTIVITY_TYPE = 'CONSTANTS/DELETED_ACTIVITY_TYPE';

export const ADDED_REGION = 'CONSTANTS/ADDED_REGION';
export const ADDED_ACTIVITY_TYPE = 'CONSTANTS/ADDED_ACTIVITY_TYPE';

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
    case FETCHING_SKILLS:
      return {
        ...state,
        skills: {
          ...state.skills,
          isFetched: false,
          isFetching: true
        }
      }
    case FETCHING_JOB_INDUSTRIES:
      return {
        ...state,
        jobIndustries: {
          ...state.jobIndustries,
          isFetched: false,
          isFetching: true
        }
      }
    case FETCHING_LISTED_JOB_LOCATIONS:
      return {
        ...state,
        listedJobLocations: {
          ...state.listedJobLocations,
          isFetched: false,
          isFetching: true
        }
      }
    case FETCHING_LISTED_JOB_SKILLS:
      return {
        ...state,
        listedJobSkills: {
          ...state.listedJobSkills,
          isFetched: false,
          isFetching: true
        }
      }

    case SET_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...payload,
          isFetching: false,
          isFetched: true
        }
      }
    case SET_LISTED_MEMBERS:
      return {
        ...state,
        listedMembers: {
          ...state.listedMembers,
          ...payload,
          isFetching: false,
          isFetched: true
        }
      }
    case SET_LOCATIONS:
      return {
        ...state,
        locations: {
          ...state.locations,
          ...payload,
          isFetching: false,
          isFetched: true,
          isUpdating: false,
          isUpdated: false,
          isDeleting: false,
          isDeleted: false,
        }
      }
    case SET_ACTIVITY_TYPES:
      return {
        ...state,
        activityTypes: {
          ...state.activityTypes,
          ...payload.activityTypes,
          isFetching: false,
          isFetched: true,
        }
      }
    case SET_SKILLS:
      return {
        ...state,
        skills: {
          ...state.skills,
          all: [...payload],
          isFetching: false,
          isFetched: true
        }
      }
    case SET_JOB_INDUSTRIES:
      return {
        ...state,
        jobIndustries: {
          ...state.jobIndustries,
          all: [...payload],
          isFetching: false,
          isFetched: true
        }
      }
    case SET_LISTED_JOB_LOCATIONS:
      return {
        ...state,
        listedJobLocations: {
          ...state.listedJobLocations,
          all: { ...payload },
          isFetching: false,
          isFetched: true
        }
      }
    case SET_LISTED_JOB_SKILLS:
      return {
        ...state,
        listedJobSkills: {
          ...state.listedJobSkills,
          all: { ...payload },
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
    case UPDATING_LOCATIONS:
      return {
        ...state,
        locations: {
          ...state.locations,
          isUpdating: true,
          isUpdated: false
        }
      }

    case DELETING_REGION:
      return {
        ...state,
        locations: {
          ...state.locations,
          isDeleting: true
        }
      }
    case DELETED_REGION:
      return {
        ...state,
        locations: {
          ...state.locations,
          regions: [...state.locations.regions.filter(v => v !== payload)],
          isDeleting: false,
          isDeleted: false,
        }
      }

    case ADDED_REGION:
      return {
        ...state,
        locations: {
          ...state.locations,
          regions: [...state.locations.regions, payload],
          isUpdating: false,
          isUpdated: true
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
    default: return state;
  }
}
