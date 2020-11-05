const initialState = {
  user: {
    isFetched: false,
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
  },
  users: {
    all: [],
    isFetched: false,
    isFetching: false,
    isFetchingMore: false,
    isFetchedMore: false,
    isLastResult: false,
  },
}

// Actions
export const FETCHING_USERS = 'USERS/FETCHING_USERS';
export const FETCHING_MORE_USERS = 'USERS/FETCHING_MORE_USERS';
export const FETCHING_USER = 'USERS/FETCHING_USER';
export const UPDATING_USER = 'USERS/UPDATING_USER';
export const DELETING_USER = 'USERS/DELETING_USER';

export const SET_USERS = 'USERS/SET_USERS';
export const SET_MORE_USERS = 'USERS/SET_MORE_USERS';
export const SET_USER = 'USERS/SET_USER';

export const ERROR = 'USERS/ERROR';

export const usersReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCHING_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          isFetched: false,
          isFetching: true,
        }
      }
    case FETCHING_MORE_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          isFetched: true,
          isFetching: false,
          isFetchedMore: false,
          isFetchingMore: true,
        }
      }
    case FETCHING_USER:
      return {
        ...state,
        user: {
          ...state.user,
          isFetched: false,
          isFetching: true,
        }
      }

    case UPDATING_USER:
      return {
        ...state,
        user: {
          ...state.user,
          isUpdated: false,
          isUpdating: true,
        }
      }
    case DELETING_USER:
      return {
        ...state,
        user: {
          ...state.user,
          isDeleted: false,
          isDeleting: true,
        }
      }

    case SET_USERS:
      return {
        ...state,
        users: {
          ...payload,
          isFetching: false,
          isFetched: true
        }
      }

    case SET_MORE_USERS:
      return {
        ...state,
        users: {
          all: [...state.users.all, ...payload.all],
          isLastResult: payload.isLastResult,
          isFetching: false,
          isFetched: true,
          isFetchingMore: false,
          isFetchedMore: true,
        }
      }
    case SET_USER:
      return {
        ...state,
        user: {
          ...payload,
          isUpdating: false,
          isUpdated: false,
          isDeleted: false,
          isDeleting: false,
          isFetching: false,
          isFetched: true
        }
      }
    case ERROR:
      return {
        ...state,
        user: {
          isFetching: false,
          isFetched: false,
        },
        users: {
          isFetching: false,
          isFetched: false,
        }
      }
    default: return state
  }
}
