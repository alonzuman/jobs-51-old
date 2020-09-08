import React, { useState, useEffect } from 'react'
import { Button, TextField, Grid, Chip, Typography, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { addActivity, getActivityTypes } from '../../../actions/activities'
import { useDispatch, useSelector } from 'react-redux'
import { setFeedback } from '../../../actions';
import { calcHours } from '../../../utils';
import { setUserRegion } from '../../../actions/auth';
import CustomChip from '../../cards/CustomChip';

const regions = ['תל אביב', 'חיפה', 'באר שבע', 'שרון', 'ירושלים']

const AddActivity = () => {
  const { uid, phone, region, avatar, firstName, lastName } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const { loading, types } = useSelector(state => state.activities)
  const [activity, setActivity] = useState({
    type: '',
    description: '',
    region: region ? region : '',
    date: '2020-08-10',
    startHour: '10:00',
    endHour: '17:30',
    approved: false,
    user: {
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      avatar: avatar ? avatar : '',
      region: region ? region : '',
      phone: phone ? phone : ''
    },
    uid
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActivityTypes())
  }, [dispatch])

  const handleRegionChange = e => {
    dispatch(setUserRegion(e.target.value, uid))
    setActivity({
      ...activity,
      region: e.target.value
    })
  }

  const handleChange = e => {
    const totalHours = calcHours(activity['startHour'], activity['endHour'], activity['date'])
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
      total: totalHours
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (activity['type'].trim().length === 0) {
      return dispatch(setFeedback({
        type: 'error',
        msg: 'fillActivityType'
      }))
    } else if (activity['startHour'] > activity['endHour']) {
      return dispatch(setFeedback({
        type: 'error',
        msg: 'hoursNoGood'
      }))
    }
    dispatch(addActivity(activity))
  }

  return (
    <form className='mt-1' onSubmit={handleSubmit}>
      {!types && <CircularProgress />}
      {types &&
      <>
        <FormControl variant="outlined">
          <InputLabel>{translation.region}</InputLabel>
          <Select disabled={region ? true : false} value={activity['region']} name='region' onChange={handleRegionChange} label={region ? region : translation.selectRegion}>
            {regions.map((region, index) => <MenuItem key={index} value={region}>{region}</MenuItem>)}
          </Select>
          { region && <Typography variant='subtitle1'>{translation.changeRegionContact}</Typography> }
        </FormControl>
        <InputLabel style={{ marginBottom: '.5rem' }}>{translation.type}</InputLabel>
        <Grid container spacing={1}>
          {types?.map((type, index) => <Grid key={index} item ><CustomChip onClick={() => setActivity({ ...activity, type })} label={type} color={activity['type'] === type ? 'primary' : 'default'} /></Grid>)}
        </Grid>
        <br />
        <FormControl>
          <TextField required label={translation.description} variant='outlined' name='description' value={activity['description']} onChange={handleChange} />
        </FormControl>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl>
              <TextField InputLabelProps={{shrink: true}} type='time' required label={translation.startHour} variant='outlined' name='startHour' value={activity['startHour']} onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <TextField InputLabelProps={{ shrink: true }} type='time' required label={translation.endHour} variant='outlined' name='endHour' value={activity['endHour']} onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl>
          <TextField InputLabelProps={{ shrink: true }} type='date' required label={translation.date} variant='outlined' name='date' value={activity['date']} onChange={handleChange} />
        </FormControl>
        <Button className='button-style' color='primary' variant='contained' type='submit' >{loading ? <CircularProgress className='button-spinner' /> : translation.addActivity}</Button>
      </>}
    </form>
  )
}

export default AddActivity
