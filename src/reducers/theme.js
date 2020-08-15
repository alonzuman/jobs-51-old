import heb from '../utils/translations/heb.json'
const themeType = localStorage.getItem('theme')

const initialState = {
  type: themeType ? themeType : 'light',
  language: 'heb',
  direction: 'rtl',
  translation: heb
}

export const themeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_THEME':
      return {
        ...state,
        type: payload.type
      }
    default: return state
  }
}
