import React from 'react'
import { Button } from '@material-ui/core'
import { addActivity } from '../../../actions/activities'
import { useDispatch, useSelector } from 'react-redux'

const AddActivity = () => {
  const { uid } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const activity = {
    type: 'dasuiohdoua',
    description: 'Eu velit et deserunt id tempor magna est proident consectetur.',
    startTime: Date.now(),
    endTime: Date.now(),
    approved: false,
    total: 4,
    uid
  }

  return (
    <div>
      <Button onClick={() => dispatch(addActivity(activity))}>Add</Button>
    </div>
  )
}

export default AddActivity
