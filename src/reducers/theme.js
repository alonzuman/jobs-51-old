import heb from '../utils/translations/heb.json'
import { createMuiTheme } from '@material-ui/core/styles'
import light from '../utils/themes/light'
import dark from '../utils/themes/dark'

const localTheme = localStorage.getItem('theme')
const theme = createMuiTheme(localTheme === 'dark' ? dark : light);

const initialState = {
  language: 'heb',
  direction: 'rtl',
  translation: heb,
  theme
}

export const SET_THEME = 'THEME/SET_THEME';

export const themeReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_THEME:
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
