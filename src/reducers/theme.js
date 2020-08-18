import heb from '../utils/translations/heb.json'
import { createMuiTheme } from '@material-ui/core/styles'

const localTheme = localStorage.getItem('theme')

const themeType = () => {
  if (localTheme) {
    return localTheme
  } else {
    return localStorage.setItem('theme', 'light')
  }
}

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
      type: localTheme,
      primary: {
        light: localTheme === 'dark' ? '#286cba' : '#185288',
        main: localTheme === 'dark' ? '#286cba' : '#093660',
        dark: localTheme === 'dark' ? '#286cba' : '#072D52'
      },
      secondary: {
        main: localTheme === 'dark' ? '#E89C68' : '#E89C68'
      }
    },
    typography: {
      fontFamily: ['Assistant', 'sans-serif']
    }
});

const initialState = {
  language: 'heb',
  direction: 'rtl',
  translation: heb,
  theme
}

export const themeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: { ...state.theme, type: payload.type }
      }
    default: return state
  }
}
