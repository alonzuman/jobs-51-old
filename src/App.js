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
import { Container, Paper } from '@material-ui/core'
import { setUser, setTheme } from './actions'
import { app } from './firebase'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import MenuButton from './components/layout/MenuButton'
import LandingPage from './pages/LandingPage'


function App() {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)
  const validateUser = () => {
    dispatch({
      type: 'AUTH_LOADING'
    })
    app.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch({
          type: 'NOT_SIGNED_IN'
        })
      }
    })
  }
  app.auth().onAuthStateChanged(() => validateUser())

  useEffect(() => { validateUser() }, [app.auth().currentUser])
  useEffect(() => { setTheme() }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <Paper className='paper-background'>
        <Router>
          <Dialogs />
          <CustomAlert />
          <MenuButton />
          <Switch>
            <Container>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/results' component={Home} />
              <ProtectedRoute path='/results/jobs' component={Jobs} />
              <Route path='/results/users' component={Employees} />
            </Container>
          </Switch>
        </Router>
      </Paper>
  </ThemeProvider>
  )
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, authenticated } = useSelector(state => state.auth)

    if (!loading && authenticated) {
      return <Route {...rest} render={props => <Route exact {...props} component={Component} />} />
    } else {
      return <Redirect to='/' />
    }
}

export default App;
