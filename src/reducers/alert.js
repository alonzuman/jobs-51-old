const initialState = {
  isOn: false,
  msg: '',
  type: ''
}

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_ALERT':
      const { msg, type } = payload
      return {
        ...state,
        isOn: true,
        msg,
        type
      }
    case 'CLEAR_ALERT':
      console.log('from new reducer')
      return {
        ...state,
        isOn: false,
        msg: '',
        type: ''
      }
    default: return state
  }
}
