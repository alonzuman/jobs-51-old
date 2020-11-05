const initialState = {
  all: [],
  unseen: [],
  seen: [],
  isFetching: false,
  isFetched: false
}

export const FETCHING = 'NOTIFICATIONS/FETCHING';
export const SET_ALL = 'NOTIFICATIONS/SET_ALL';
export const MARK_SEEN = 'NOTIFICATIONS/MARK_SEEN';
export const ERROR = 'NOTIFICATIONS/ERROR';

export const notificationsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCHING: {
      return {
        ...state,
        isFetched: false,
        isFetching: true
      }
    }
    case SET_ALL:
      return {
        ...state,
        all: [...payload],
        seen: [...payload?.filter(v => v.seen)],
        unseen: [...payload?.filter(v => !v.seen)],
        isFetching: false,
        isFetched: true
      }
    case MARK_SEEN:
      return {
        ...state,
        seen: [...state.seen, payload],
        unseen: [...state.unseen.filter(v => v.id !== payload.id)],
      }
    case ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: false
      }
    default: return state;
  }
}
