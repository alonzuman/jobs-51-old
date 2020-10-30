const initialState = {
  all: [],
  unseen: [],
  loading: false
}

export const LOADING = 'NOTIFICATIONS/LOADING';
export const SET_ALL = 'NOTIFICATIONS/SET_ALL';
export const MARK_SEEN = 'NOTIFICATIONS/MARK_SEEN';
export const ERROR = 'NOTIFICATIONS/ERROR';

export const notificationsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_ALL:
      return {
        ...state,
        all: [...payload],
        unseen: [...payload?.filter(v => !v.seen)],
        loading: false
      }
    case MARK_SEEN:
      return {
        ...state,
        unseen: [...state.unseen.filter(v => v.id !== payload.id)],
        loading: false
      }
    case ERROR:
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}
