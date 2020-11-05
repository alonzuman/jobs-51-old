import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
import PrivacyPolicy from './pages/PrivacyPolicy/index'
import LandingPage from './pages/LandingPage/index'
import PageDoesntExist from './pages/404'
import GeneralManagement from './pages/Admin/pages/GeneralManagement'
import Region from './pages/Region'

// Components
import Feedback from './v2/atoms/Feedback'
import Navbar from './v2/layout/Navbar/Navbar'
import ProtectedRoute from './v2/layout/ProtectedRoute'

const ProtectedRouter = () => {
  return (
    <Router>
      <Feedback />
      <Navbar />
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

        {/* Regions */}
        <ProtectedRoute exact path='/regions/:region' component={Region} />

        {/* Users */}
        <ProtectedRoute exact requiredRole='user' path='/users/:id' component={User} />
        <ProtectedRoute exact requiredRole='user' path='/users/:id/edit' component={EditUser} />

        {/* Admin */}
        <ProtectedRoute exact requiredRole='manager' path='/admin' component={Admin} />
        <ProtectedRoute exact requiredRole='manager' path='/admin/users' component={Users} />
        <ProtectedRoute exact requiredRole='manager' path='/admin/activities' component={Activities} />
        <ProtectedRoute exact requiredRole='admin' path='/admin/general-management' component={GeneralManagement} />

        {/* Notifications */}
        <ProtectedRoute exact requiredRole='user' path='/:uid/notifications' component={Notifications} />

        {/* Static */}
        <ProtectedRoute exact path='/privacy-policy' component={PrivacyPolicy} />

        {/* Not Protected */}
        <Route exact path='/' component={LandingPage} />
        <Route path='/' component={PageDoesntExist} />
      </Switch>
    </Router>
  )
}

export default ProtectedRouter
