import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLookingForJob } from '../../../actions'
import { Switch, Typography } from '@material-ui/core'

const ToggleLookingForJob = ({ style, uid, lookingForJob }) => {
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleLookingForJobChange = async () => {
    await dispatch(toggleLookingForJob({ uid, currentValue: !lookingForJob }))
  }

  return (
    <div style={{ ...style }}>
      <Typography variant='subtitle1'>{translation.iAmLookingForAJob}</Typography>
      <Switch color='primary' checked={lookingForJob} onChange={handleLookingForJobChange} />
    </div>
  )
}

export default ToggleLookingForJob
