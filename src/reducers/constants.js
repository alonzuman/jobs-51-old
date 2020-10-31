const initialState = {
  isFetching: false,
  isFetched: false,
}

// Actions
export const LOADING = 'CONSTANTS/LOADING';
export const SET_ALL = 'CONSTANTS/SET_ALL'
export const ERROR = 'CONSTANTS/ERROR'

export const constantsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isFetching: true,
        isFetched: false
      }
    case SET_ALL:
      return {
        ...state,
        ...payload,
        isFetching: false,
        isFetched: true
      }
    case ERROR:
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}
