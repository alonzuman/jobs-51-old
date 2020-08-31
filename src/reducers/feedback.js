const initialState = {
  isOn: false,
  msg: '',
  type: ''
}

export const feedbackReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_FEEDBACK':
      return {
        ...state,
        isOn: true,
        msg: payload.msg,
        type: payload.type
      }
    case 'REMOVE_FEEDBACK':
      return {
        ...state,
        isOn: false,
        msg: '',
        type: ''
      }
    default: return state;
  }
}
