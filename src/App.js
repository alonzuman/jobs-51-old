import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import DirectionProvider from './contexts/DirectionContext'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { setTheme, verifyUser } from './actions'

import Container from './v2/atoms/Container'
import { CircularProgress } from '@material-ui/core'
import ProtectedRouter from './ProtectedRouter'

function App() {
  const { isFetching, isFetched } = useSelector(state => state.auth)
  const { theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme?.palette?.background?.main || 'white'
    setTheme()
  }, [theme])

  useEffect(() => {
    dispatch(verifyUser())
  }, [])

  if (isFetching || !isFetched) {
    return (
      <ThemeProvider theme={theme}>
        <Container className='flex align__center justify__center mnh-256'>
          <CircularProgress />
        </Container>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <DirectionProvider>
          <ProtectedRouter />
        </DirectionProvider>
      </ThemeProvider>
    )
  }
}

export default App;
