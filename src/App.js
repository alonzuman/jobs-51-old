import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'

// Pages
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'
import SavedJobs from './components/dialogs/SavedJobs'
import Navbar from './components/layout/Navbar'
import EditProfile from './components/forms/EditProfile'
import Activity from './pages/Activity'
import Notifications from './pages/Notifications'
import Admin from './pages/Admin'
import User from './pages/User'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { setTheme } from './actions'

// Redux
import { useSelector } from 'react-redux'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './ProtectedRoute'
import RtlProvider from './contexts/RtlContext'
import ManageUsers from './pages/admin/ManageUsers'
import ManageActivities from './pages/admin/ManageActivities'
import Home from './pages/Home'
import Events from './pages/Events'
import Feedback from './components/layout/Feedback'


function App() {
  const { authenticated } = useSelector(state => state.auth)
  const { theme } = useSelector(state => state.theme)

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme?.palette?.background?.main || 'white'
    setTheme()
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <RtlProvider>
        <Router>
          <Dialogs />
          <Feedback />
          <Switch>
            <ProtectedRoute exact path='/main' component={Home} />
            <ProtectedRoute exact path='/jobs' component={Jobs} />
            <ProtectedRoute exact path='/events' component={Events} />
            <ProtectedRoute exact path='/saved' component={SavedJobs} />
            <ProtectedRoute exact path='/activity' component={Activity} />
            <ProtectedRoute exact path='/notifications' component={Notifications} />
            <ProtectedRoute exact path='/profile' component={EditProfile} />
            <ProtectedRoute exact path='/users' component={Employees} />
            <ProtectedRoute exact requiredRole='manager' path='/admin' component={Admin} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/users' component={ManageUsers} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/activities' component={ManageActivities} />
            <ProtectedRoute exact requiredRole='manager' path='/users/:id' component={User} />
            <Route exact path='/' component={LandingPage} />
          </Switch>
          {authenticated && <Navbar />}
        </Router>
      </RtlProvider>
    </ThemeProvider>
  )
}

export default App;
