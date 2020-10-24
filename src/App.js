import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Components
import Navbar from './components/layout/Navbar/Navbar'
import ProtectedRoute from './ProtectedRoute'
import RtlProvider from './contexts/RtlContext'

// Pages
import Job from './pages/job/Job'
import Jobs from './pages/jobs/Jobs'
import Employees from './pages/Employees'
import Admin from './pages/admin/Admin'
import User from './pages/user/User'
import ManageActivities from './pages/admin/ManageActivities'
import Home from './pages/home/Home'
import Feedback from './components/layout/Feedback'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Profile from './pages/profile/Profile'
import EditUser from './pages/user/EditUser'
import LandingPage from './pages/LandingPage'
import ManageConstants from './pages/admin/ManageConstants'

// Mui
import { ThemeProvider } from '@material-ui/core/styles';
import { setTheme } from './actions'
import EditJob from './pages/job/EditJob'
import Activity from './pages/activity/Activity'
import Saved from './pages/saved/Saved'
import Users from './pages/admin/pages/users/Users'


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
          <Feedback />
          {authenticated && <Navbar />}
          <Switch>
            <ProtectedRoute exact path='/home' component={Home} />
            <ProtectedRoute exact path='/privacy-policy' component={PrivacyPolicy} />

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
            <ProtectedRoute exact path='/users' component={Employees} />
            <ProtectedRoute exact requiredRole='user' path='/users/:id' component={User} />
            <ProtectedRoute exact requiredRole='user' path='/users/:id/edit' component={EditUser} />

            {/* Admin */}
            <ProtectedRoute exact requiredRole='manager' path='/admin' component={Admin} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/users' component={Users} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/activities' component={ManageActivities} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/constants' component={ManageConstants} />

            <Route exact path='/' component={LandingPage} />
          </Switch>
        </Router>
      </RtlProvider>
    </ThemeProvider>
  )
}

export default App;
