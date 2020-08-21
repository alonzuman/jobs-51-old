import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog, addJob, getJobs, openAddingJob } from '../actions'
import Jobs from './Jobs'
import { Button } from '@material-ui/core'

const Home = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)

  return (
    <div>
      <Button>{translation.addJob}</Button>
      <Button onClick={() => dispatch(openDialog({ type: 'SignIn', title: 'signIn' }))}>{translation.signIn}</Button>
      <Jobs />
    </div>
  )
}

export default Home
