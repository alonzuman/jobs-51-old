import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLookingForJob } from '../../../actions'
import { InputLabel, Switch } from '@material-ui/core'

const ToggleLookingForJob = () => {
  const { lookingForJob, uid } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleLookingForJobChange = () => {
    dispatch(toggleLookingForJob({ uid, currentValue: !lookingForJob }))
  }

  return (
    <div>
    <InputLabel>{translation.lookingForJob}</InputLabel>
    <Switch color='primary' checked={lookingForJob} onChange={handleLookingForJobChange} />
    </div>
  )
}

export default ToggleLookingForJob
