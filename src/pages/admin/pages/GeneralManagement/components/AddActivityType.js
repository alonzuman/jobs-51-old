import { Button, CircularProgress, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addActivityType } from '../../../../../actions/constants'

const AddActivityType = () => {
  const { translation } = useSelector(state => state.theme)
  const { isUpdating, isDeleting } = useSelector(state => state.constants.activityTypes)
  const [errors, setErrors] = useState({})
  const [activityTypeToAdd, setActivityTypeToAdd] = useState('')

  const dispatch = useDispatch()

  const handleChange = e => {
    setErrors({})
    setActivityTypeToAdd(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (activityTypeToAdd?.trim()?.length === 0) {
      setErrors({
        activityTypeToAdd: translation.fieldRequired
      })
    } else {
      dispatch(addActivityType(activityTypeToAdd))
      setActivityTypeToAdd('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField helperText={errors.activityTypeToAdd} error={Boolean(errors.activityTypeToAdd)} placeholder={translation.activityTypeToAddPlaceholder} label={translation.activityTypeToAdd} value={activityTypeToAdd} onChange={handleChange} variant='outlined' size='small' />
      <Button type='submit' color='primary' disabled={isDeleting || isUpdating} size='large' variant='contained' >{isUpdating ? <CircularProgress className='button-spinner' /> : translation.addActivityType}</Button>
    </form>
  )
}

export default AddActivityType
