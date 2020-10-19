import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { app } from './firebase'
import { setUser, signOut } from './actions'
import CircularSpinnerWithContainer from './components/layout/CircularSpinnerWithContainer'
import { checkPermissions } from './utils'
import NoPermissionPage from './NoPermissionPage'
import { getConstants } from './actions/constants'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { isFetching, isFetched } = useSelector(state => state.constants)
  const { loading, role } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser
  const { requiredRole } = rest

  useEffect(() => {
    dispatch({ type: 'AUTH_LOADING' })
    if (!isFetched) {
      dispatch(getConstants())
    }
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(setUser(user))
        if (isFetched && currentUser && checkRole()) {
          setIsLoading(false)
        }
      } else {
        dispatch(signOut())
        return <Redirect to='/' />
      }
    })
  }, [dispatch, isFetched])

  const checkRole = () => {
    if (requiredRole && currentUser) {
      const requirement =  checkPermissions(requiredRole)
      const currentUserRole = checkPermissions(role)
      return (currentUserRole >= requirement)
    } else {
      return true
    }
  }

  return (
    <div style={{ direction: 'rtl', paddingBottom: '7.5rem' }}>
      {isLoading && <CircularSpinnerWithContainer />}
      {!isLoading && <Route {...rest} render={props => <Component {...props} />} />}
      {!isLoading && !currentUser && <Redirect to='/' />}
    </div>
  )
}

export default ProtectedRoute
