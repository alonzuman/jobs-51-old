const initialState = {
  isOn: false,
  type: '',
  msg: ''
}

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_ALERT':
      const { type, msg } = payload
      console.log('alert is on', msg, type)
      return {
        ...state,
        isOn: true,
        type,
        msg
      }
    case 'CLEAR_ALERT':
      return {
        ...state,
        isOn: false,
        msg: '',
        type: ''
      }
    default: return state
  }
}
