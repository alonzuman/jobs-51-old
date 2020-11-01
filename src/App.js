import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Components
import Navbar from './v2/layout/Navbar/Navbar'
import ProtectedRoute from './v2/layout/ProtectedRoute'
import DirectionProvider from './contexts/DirectionContext'
import Feedback from './v2/atoms/Feedback'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { setTheme } from './actions'

// Pages
import Job from './pages/Job'
import EditJob from './pages/Job/EditJob'
import Jobs from './pages/Jobs'
import Admin from './pages/Admin'
import User from './pages/User'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EditUser from './pages/User/EditUser'
import Activity from './pages/Activity'
import Saved from './pages/Saved'
import Users from './pages/Admin/pages/Users'
import Activities from './pages/Admin/pages/Activities'
import Notifications from './pages/Notifications'
import RegionUsers from './pages/Admin/pages/RegionUsers'
import RegionActivities from './pages/Admin/pages/RegionActivities'
import PrivacyPolicy from './pages/PrivacyPolicy/index'
import LandingPage from './pages/LandingPage/index'
import PageDoesntExist from './pages/404'

function App() {
  const { authenticated } = useSelector(state => state.auth)
  const { theme } = useSelector(state => state.theme)

  useEffect(() => {
    document.querySelector('body').style.backgroundColor = theme?.palette?.background?.main || 'white'
    setTheme()
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <DirectionProvider>
        <Router>
          <Feedback />
          {authenticated && <Navbar />}
          <Switch>
            {/* Home */}
            <ProtectedRoute exact path='/home' component={Home} />

            {/* Jobs */}
            <ProtectedRoute exact path='/jobs' component={Jobs} />
            <ProtectedRoute exact path='/jobs/:jid' component={Job} />
            <ProtectedRoute exact path='/jobs/:jid/edit' component={EditJob} />

            {/* Saved */}
            <ProtectedRoute exact path='/:uid/saved' component={Saved} />

            {/* Activity */}
            <ProtectedRoute exact path='/:uid/activity' component={Activity} />

            {/* Profile */}
            <ProtectedRoute exact path='/profile' component={Profile} />

            {/* Users */}
            <ProtectedRoute exact requiredRole='user' path='/users/:id' component={User} />
            <ProtectedRoute exact requiredRole='user' path='/users/:id/edit' component={EditUser} />

            {/* Admin */}
            <ProtectedRoute exact requiredRole='manager' path='/admin' component={Admin} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/users' component={Users} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/activities' component={Activities} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/:region/users' component={RegionUsers} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/:region/activities' component={RegionActivities} />

            {/* Notifications */}
            <ProtectedRoute exact requiredRole='user' path='/:uid/notifications' component={Notifications} />

            {/* Static */}
            <ProtectedRoute exact path='/privacy-policy' component={PrivacyPolicy} />

            {/* Not Protected */}
            <Route exact path='/' component={LandingPage} />
            <Route path='/' component={PageDoesntExist} />
          </Switch>
        </Router>
      </DirectionProvider>
    </ThemeProvider>
  )
}

export default App;
