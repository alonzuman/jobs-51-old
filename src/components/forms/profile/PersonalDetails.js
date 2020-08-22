import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddChips from '../AddChips'
import { addPersonalDetails } from '../../../actions'
import { auth } from 'firebase'
import FormSkeleton from '../FormSkeleton'

const PersonalDetails = () => {
  const authState = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const [skills, setSkills] = useState(authState.skills)
  const [serviceYear, setServiceYear] = useState(authState.serviceYear)
  const [lastPosition, setLastPosition] = useState(authState.lastPosition)
  const [preferredLocation, setPreferredLocation] = useState(authState.preferredLocation)

  const handleSubmit = e => {
    e.preventDefault()
    const personalDetails = {
      serviceYear,
      lastPosition,
      preferredLocation,
      skills
    }
    dispatch(addPersonalDetails(authState, personalDetails, authState.uid))
  }

  return (
    <form onSubmit={handleSubmit}>
      {authState &&
      <>
        <TextField label={translation.serviceYear} variant='outlined' value={serviceYear} onChange={e => setServiceYear(e.target.value)} />
        <TextField label={translation.lastPosition} variant='outlined' value={lastPosition} onChange={e => setLastPosition(e.target.value)} />
        <TextField label={translation.preferredLocation} variant='outlined' value={preferredLocation} onChange={e => setPreferredLocation(e.target.value)} />
        <AddChips label={translation.skills} chips={skills} setChips={setSkills} />
        <Button className='button-style' variant='contained' color='primary' type='submit'>{translation.update}</Button>
      </>}
    </form>
  )
}

export default PersonalDetails
