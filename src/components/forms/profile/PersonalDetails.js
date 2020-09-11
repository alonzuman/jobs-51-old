import React, { useState } from 'react'
import { TextField, Button, CircularProgress, Grid, FormControl, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddChips from '../AddChips'
import { addPersonalDetails } from '../../../actions'
import ToggleLookingForJob from './ToggleLookingForJob'
import PaperContainer from '../../layout/PaperContainer'
import ToggleVolunteer from './ToggleVolunteer'

const PersonalDetails = () => {
  const authState = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const [skills, setSkills] = useState(authState.skills || [])
  const [serviceYear, setServiceYear] = useState(authState.serviceYear || '')
  const [lastPosition, setLastPosition] = useState(authState.lastPosition || '')
  const [preferredLocation, setPreferredLocation] = useState(authState.preferredLocation || '')
  const dispatch = useDispatch()

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
    <PaperContainer>
      <form onSubmit={handleSubmit}>
        {!serviceYear && <Typography variant='body1'>{translation.lookingForJobFillDetails}</Typography>}
        <ToggleLookingForJob />
        <ToggleVolunteer user={authState} />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField label={translation.serviceYear} variant='outlined' value={serviceYear} onChange={e => setServiceYear(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField label={translation.preferredLocation} variant='outlined' value={preferredLocation} onChange={e => setPreferredLocation(e.target.value)} />
          </Grid>
        </Grid>
        <TextField label={translation.lastPosition} variant='outlined' value={lastPosition} onChange={e => setLastPosition(e.target.value)} />
        <AddChips collection='skills' label={translation.skills} chips={skills} setChips={setSkills} />
        <FormControl className='mb-0'>
          <Button className='button-style' variant='contained' color='primary' type='submit'>{authState.loading ? <CircularProgress className='button-spinner' /> : translation.update}</Button>
        </FormControl>
      </form>
    </PaperContainer>
  )
}

export default PersonalDetails
