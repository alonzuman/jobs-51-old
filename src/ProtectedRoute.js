import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { app } from './firebase'
import { setUser, signOut } from './actions'
import CircularSpinnerWithContainer from './components/layout/CircularSpinnerWithContainer'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true)
  const { authenticated } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser

  useEffect(() => {
    dispatch({ type: 'AUTH_LOADING' })
    app.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user))
        setLoading(false)
      } else {
        dispatch(signOut())
        setLoading(false)
      }
    })
  }, [])

  return (
    <>
      {loading && <CircularSpinnerWithContainer />}
      {!loading && currentUser && <Route {...rest} render={props => <Component {...props} />} />}
      {!loading && !currentUser && <Redirect to='/' />}
    </>
  )
}

export default ProtectedRoute
