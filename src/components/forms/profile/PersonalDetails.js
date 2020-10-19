import React, { useState } from 'react'
import { TextField, Button, CircularProgress, Grid, FormControl, Typography, Paper } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { addPersonalDetails } from '../../../actions'
import ToggleLookingForJob from './ToggleLookingForJob'
import SkillsSelect from './SkillsSelect'
import LocationSelect from './LocationSelect'

const PersonalDetails = ({ customMsg }) => {
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
    <Paper className='ptb-5 ps-1'>
      <form onSubmit={handleSubmit}>
        {customMsg &&
          <>
            <Typography variant='body1'>{customMsg}</Typography>
            <br />
          </>}
        <ToggleLookingForJob lookingForJob={authState.lookingForJob} uid={authState.uid} />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField placeholder={translation.serviceYearPlaceholder} label={translation.serviceYear} variant='outlined' value={serviceYear} onChange={e => setServiceYear(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <LocationSelect
              location={preferredLocation}
              setLocation={setPreferredLocation}
            />
          </Grid>
        </Grid>
        <TextField placeholder={translation.lastPositionPlaceholder} label={translation.lastPosition} variant='outlined' value={lastPosition} onChange={e => setLastPosition(e.target.value)} />
        <SkillsSelect placeholder={translation.skillsPlaceholder} collection='skills' label={translation.skills} skills={skills} setSkills={setSkills}  />
        <FormControl className='mb-0'>
          <Button className='button-style' variant='contained' color='primary' type='submit'>{authState.loading ? <CircularProgress className='button-spinner' /> : translation.update}</Button>
        </FormControl>
      </form>
    </Paper>
  )
}

export default PersonalDetails
