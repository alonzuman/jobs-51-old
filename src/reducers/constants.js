const initialState = {
  isFetching: false,
  isFetched: false,
}

export const constantsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CONSTANTS_LOADING':
      return {
        ...state,
        isFetching: true,
        isFetched: false
      }
    case 'SET_ALL_CONSTANTS':
      return {
        ...state,
        ...payload,
        isFetching: false,
        isFetched: true
      }
    default: return state;
  }
}
