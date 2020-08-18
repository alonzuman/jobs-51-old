import React, { useEffect, Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'
import CustomAlert from './components/layout/CustomAlert'

// Pages
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'

// Mui
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, CircularProgress } from '@material-ui/core'
import { setUser, signOut } from './actions'
import { app } from './firebase'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import MenuButton from './components/layout/MenuButton'
import LandingPage from './pages/LandingPage'

const theme = createMuiTheme({
  direction: 'rtl',
});

function App() {
  const dispatch = useDispatch()
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
  useEffect(() => { validateUser() }, [])

  const containerStyle = {
    padding: '4rem 1rem'
  }

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Dialogs />
          <CustomAlert />
          <MenuButton />
          <Switch>
            <Container style={containerStyle}>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/results' component={Home} />
              <ProtectedRoute path='/results/jobs' component={Jobs} />
              <Route path='/results/users' component={Employees} />
            </Container>
          </Switch>
        </Router>
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
