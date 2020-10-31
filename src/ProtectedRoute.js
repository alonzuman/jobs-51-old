import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { app } from './firebase'
import { getNotifications, setUser, signOut } from './actions'
import { checkPermissions } from './utils'
import { getConstants } from './actions/constants'
import styled from 'styled-components'
import { LOADING } from './reducers/auth'
import CircularSpinnerWithContainer from './components/layout/CircularSpinnerWithContainer'

// Pages
import PendingApproval from './pages/PendingApproval'
import NoAccessPage from './pages/403'

const Container = styled.div`
  direction: rtl;
`

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true)
  const { isFetched } = useSelector(state => state.constants)
  const { role } = useSelector(state => state.auth)
  const { all } = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser
  const { requiredRole } = rest

  useEffect(() => {
    if (!isFetched) {
      dispatch(getConstants())
    }
  }, [isFetched])

  useEffect(() => {
    if (all?.length === 0 && currentUser) {
      dispatch(getNotifications(currentUser.uid))
    }
  }, [currentUser])

  useEffect(() => {
    dispatch({
      type: LOADING
    })
    app.auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(setUser(user))
        await setLoading(false)
      } else {
        await dispatch(signOut())
        await setLoading(false)
        return <Redirect to='/' />
      }
    })
  }, [dispatch])

  const checkRole = () => {
    if (requiredRole && currentUser) {
      const requirement =  checkPermissions(requiredRole)
      const currentUserRole = checkPermissions(role)
      return (currentUserRole >= requirement)
    } else {
      return true
    }
  }

  if (!loading && checkPermissions(role) === 0) {
    return <PendingApproval />
  } else {
    return (
      <Container>
        {loading && <CircularSpinnerWithContainer />}
        {!loading && !checkRole() && <NoAccessPage />}
        {!loading && currentUser && checkRole() && <Route {...rest} render={props => <Component {...props} />} />}
        {!loading && !currentUser && <Redirect to='/' />}
      </Container>
    )
  }
}

export default ProtectedRoute
