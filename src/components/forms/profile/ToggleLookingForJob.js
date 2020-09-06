import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLookingForJob } from '../../../actions'
import { Switch, Typography } from '@material-ui/core'

const ToggleLookingForJob = ({ style }) => {
  const { lookingForJob, uid } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleLookingForJobChange = () => {
    dispatch(toggleLookingForJob({ uid, currentValue: !lookingForJob }))
  }

  return (
    <div style={{ ...style }}>
      <Typography variant='subtitle1'>{translation.iAmLookingForAJob}</Typography>
      <Switch color='primary' checked={lookingForJob} onChange={handleLookingForJobChange} />
    </div>
  )
}

export default ToggleLookingForJob
