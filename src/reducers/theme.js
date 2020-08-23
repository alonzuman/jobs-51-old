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
      type: themeType(),
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
      fontFamily: ['Assistant', 'sans-serif'],
      h1: {
        fontSize: '2.5rem',
        fontWeight: 400,
        padding: '.5rem 0',
        color: localTheme === 'dark' ? '#white' : '#black',
      },
      subtitle1: {
        fontSize: '.6rem',
        color: '#f7f7f7'
      }
    },
    background: {
      paper: localTheme === 'dark' ? '#424242' : '#fff',
      default: localTheme === 'dark' ? '#303030' : '#fafafa'
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
      console.log(state.theme.palette.type)
      console.log(payload.type)
      return {
        ...state,
        theme: {
          ...state.theme,
          palette: {
            ...state.theme.palette,
            type: payload.type
          }
        }
      }
    default: return state
  }
}
