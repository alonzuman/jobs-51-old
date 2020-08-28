import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { app } from './firebase'
import { setUser, signOut } from './actions'
import CircularSpinnerWithContainer from './components/layout/CircularSpinnerWithContainer'
import { checkPermissions } from './utils'
import NoPermissions from './NoPermissions'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true)
  const { role } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser
  const { requiredRole } = rest


  useEffect(() => {
    dispatch({ type: 'AUTH_LOADING' })
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(setUser(user))
        setLoading(false)
      } else {
        dispatch(signOut())
        setLoading(false)
        return <Redirect to='/' />
      }
    })
  }, [])

  const checkRole = () => {
    if (requiredRole && currentUser) {
      const requirement =  checkPermissions(requiredRole)
      const currentUserRole = checkPermissions(role)
      return (currentUserRole >= requirement)
    } else {
      return true
    }
  }

  if (!loading && checkPermissions(role)  === 0) {
    return <NoPermissions />
  } else {
    return (
      <div style={{ direction: 'rtl', paddingBottom: '7.5rem' }}>
        {loading && <CircularSpinnerWithContainer />}
        {!loading && currentUser && checkRole() && <Route {...rest} render={props => <Component {...props} />} />}
        {!loading && !currentUser && <Redirect to='/' />}
      </div>
    )
  }
}

export default ProtectedRoute
