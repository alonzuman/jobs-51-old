import { createMuiTheme } from '@material-ui/core/styles'
const localTheme = localStorage.setItem('theme', 'light')

export const theme = createMuiTheme({
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
  },
  background: {
    paper: (localTheme && localTheme === 'dark') ? '#424242' : '#fff',
    default: (localTheme && localTheme === 'dark') ? '#303030' : '#fafafa'
  }
});
