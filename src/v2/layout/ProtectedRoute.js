import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { app } from '../../firebase'
import { getNotifications, setUser, signOut, verifyUser } from '../../actions'
import { checkPermissions } from '../../utils'
import styled from 'styled-components'
import CircularSpinnerWithContainer from '../atoms/CircularSpinnerWithContainer'

// Pages
import PendingApproval from '../../pages/PendingApproval'
import NoAccessPage from '../../pages/403'

const Container = styled.div`
  direction: rtl;
`

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isFetching, isFetched, role, uid, isAuthenticated } = useSelector(state => state.auth)
  const { isFetched: notificationsFetched } = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser
  const { requiredRole } = rest

  useEffect(() => {
    if (!notificationsFetched && isAuthenticated) {
      dispatch(getNotifications(uid))
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated && !isFetched) {
      dispatch(verifyUser)
    }
  }, [dispatch])


  const checkRole = () => {
    if (requiredRole && currentUser) {
      const requirement = checkPermissions(requiredRole)
      const currentUserRole = checkPermissions(role)
      return (currentUserRole >= requirement)
    } else {
      return true
    }
  }

  if (isFetching) {
    return (
      <Container className='flex align__center justify__center'>
        <CircularSpinnerWithContainer />
      </Container>
    )
  } else if (isFetched && checkPermissions(role) === 0) {
    return <PendingApproval />
  } else if (isAuthenticated && !checkRole()) {
    return <NoAccessPage />
  } else if (isAuthenticated && checkRole()) {
    return (
      <Container>
        <Route {...rest} render={props => <Component {...props} />} />
      </Container>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ProtectedRoute
