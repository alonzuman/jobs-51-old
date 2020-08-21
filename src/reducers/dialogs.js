const initialState = {
  title: '',
  type: '',
  open: false,
  loading: true
}

export const dialogsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'DIALOG_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'OPEN_DIALOG':
      return {
        ...state,
        title: payload.title,
        type: payload.type,
        open: true,
        loading: false
      }
    case 'CLOSE_DIALOGS':
      return {
        ...initialState
      }
    default: return state
  }
}
