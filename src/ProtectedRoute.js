import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { app } from './firebase'
import { setUser, signOut } from './actions'
import CircularSpinnerWithContainer from './components/layout/CircularSpinnerWithContainer'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const currentUser = app.auth().currentUser

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

  return (
    <>
      {loading && <CircularSpinnerWithContainer />}
      {!loading && currentUser && <Route {...rest} render={props => <Component {...props} />} />}
      {!loading && !currentUser && <Redirect to='/' />}
    </>
  )
}

export default ProtectedRoute
