import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'
import Navbar from './components/layout/Navbar/Navbar'

// Pages
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'
import SavedJobs from './pages/SavedJobs'
import Activity from './pages/Activity'
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
import Feedback from './components/layout/Feedback'
import Job from './pages/Job'
import UserActivities from './pages/UserActivities'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ManageConstants from './pages/admin/ManageConstants'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import PersonalInfo from './pages/PersonalInfo'
import LoginAndSecurity from './pages/LoginAndSecurity'


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
          {authenticated && <Navbar />}
          <Switch>
            <ProtectedRoute exact path='/home' component={Home} />
            <ProtectedRoute exact path='/privacy-policy' component={PrivacyPolicy} />

            {/* Jobs */}
            <ProtectedRoute exact path='/jobs' component={Jobs} />
            <ProtectedRoute exact path='/jobs/:id' component={Job} />

            <ProtectedRoute exact path='/saved' component={SavedJobs} />
            <ProtectedRoute exact path='/activity' component={Activity} />
            {/* Profile */}
            <ProtectedRoute exact path='/profile' component={Profile} />
            <ProtectedRoute exact path='/profile/settings' component={Settings} />
            <ProtectedRoute exact path='/profile/login-and-security' component={LoginAndSecurity} />
            <ProtectedRoute exact path='/profile/personal-info' component={PersonalInfo} />

            {/* Users */}
            <ProtectedRoute exact path='/users' component={Employees} />
            <ProtectedRoute exact path='/users/:id/activities' component={UserActivities} />
            <ProtectedRoute exact requiredRole='manager' path='/admin' component={Admin} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/users' component={ManageUsers} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/activities' component={ManageActivities} />
            <ProtectedRoute exact requiredRole='manager' path='/admin/constants' component={ManageConstants} />
            <ProtectedRoute exact requiredRole='user' path='/users/:id' component={User} />
            <Route exact path='/' component={LandingPage} />
          </Switch>
        </Router>
      </RtlProvider>
    </ThemeProvider>
  )
}

export default App;
