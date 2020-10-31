const initialState = {
  isOn: false,
  msg: '',
  type: ''
}

// Actions
export const SET_ONE = 'FEEDBACK/SET_ONE';
export const DELETE_ONE = 'FEEDBACK/DELETE_ONE';

export const feedbackReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ONE:
      return {
        ...state,
        isOn: true,
        msg: payload.msg,
        type: payload.type
      }
    case DELETE_ONE:
      return {
        ...state,
        isOn: false,
        msg: '',
        type: ''
      }
    default: return state;
  }
}
