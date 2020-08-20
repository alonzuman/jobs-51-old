import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'
import CustomAlert from './components/layout/CustomAlert'

// Pages
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { Container, Paper, CircularProgress } from '@material-ui/core'
import { setUser, setTheme, signOut } from './actions'
import { app } from './firebase'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import MenuButton from './components/layout/MenuButton'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './ProtectedRoute'


function App() {
  const { theme } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    setTheme()
  }, [theme])

  const paperStyle = {
    backgroundColor: localStorage.getItem('theme') === 'dark' ? '#303030' : '#fafafa'
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper style={paperStyle} className='paper-background'>
        <Router>
          <Dialogs />
          <CustomAlert />
          <MenuButton />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <ProtectedRoute exact path='/results/jobs' component={Jobs} />
            <ProtectedRoute exact path='/results/users' component={Employees} />
          </Switch>
        </Router>
      </Paper>
  </ThemeProvider>
  )
}

export default App;
