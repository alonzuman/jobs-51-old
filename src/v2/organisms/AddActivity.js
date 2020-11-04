import React, { useEffect, useState } from 'react'
import { Button, TextField, Grid, Typography, CircularProgress, FormControl, InputLabel, MenuItem, Select, DialogContent } from '@material-ui/core'
import { addActivity } from '../../actions/activities'
import { useDispatch, useSelector } from 'react-redux'
import { getLocations, setFeedback, updateUser } from '../../actions';
import DialogActionsContainer from '../atoms/DialogActionsContainer';
import CustomChip from '../atoms/CustomChip';
import { formatDate } from '../../utils';
import LocationSelect from '../molecules/LocationSelect';

const AddActivity = ({ onClose }) => {
  const { uid, phone, region, avatar: userAvatar, firstName, lastName } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.activities)
  const { all } = useSelector(state => state.constants?.activityTypes)
  const { regions, isFetching } = useSelector(state => state?.constants)
  const [errors, setErrors] = useState({})
  const [total, setTotal] = useState('')
  const [stateRegion, setRegion] = useState('')
  const [activity, setActivity] = useState({
    type: '',
    description: '',
    region: region ? region : '',
    date: formatDate(Date.now()),
    approved: false,
    user: {
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      avatar: userAvatar ? userAvatar : '',
      region: region ? region : '',
      phone: phone ? phone : ''
    },
    uid
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (region) {
      setRegion(region)
    }
  }, [region])

  useEffect(() => {
    if (regions?.length === 0) {
      dispatch(getLocations())
    }
  }, [regions])

  const handleChange = e => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const totalInt = parseFloat(total)
    if (totalInt < 1 || totalInt > 24 || typeof totalInt !== 'number' || !totalInt) {
      return dispatch(setFeedback({
        type: 'error',
        msg: translation.invalidInput
      }))
    }
    if (activity['type'].trim().length === 0) {
      return dispatch(setFeedback({
        type: 'error',
        msg: translation.fillActivityType
      }))
    } else if (activity['startHour'] > activity['endHour']) {
      return dispatch(setFeedback({
        type: 'error',
        msg: translation.hoursNoGood
      }))
    }
    await dispatch(addActivity({
      ...activity,
      total: totalInt
    }))

    await onClose()
  }

  if (!all) {
    return <CircularProgress />
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <LocationSelect
            location={stateRegion}
            setLocation={setRegion}
            loading={isFetching}
            size='small'
            disabled={!!stateRegion}
          />
          <Typography variant='subtitle1'>{translation.type}</Typography>
          <Grid container spacing={1}>
            {all?.map((type, index) => (
              <Grid key={index} item>
                <CustomChip
                  onClick={() => setActivity({ ...activity, type })}
                  label={type}
                  color={activity['type'] === type ? 'primary' : 'default'}
                />
              </Grid>
            ))}
          </Grid>
          <br />
          <FormControl>
            <TextField
              size='small'
              required
              label={translation.description}
              placeholder={translation.activityDescriptionPlaceholder}
              variant='outlined'
              multiline
              rows={3}
              name='description'
              value={activity['description']}
              onChange={handleChange}
            />
          </FormControl>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  size='small'
                  step='any'
                  min='1'
                  max='24'
                  type='number'
                  value={total}
                  label={translation.totalHours}
                  variant='outlined'
                  onChange={e => setTotal(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  size='small'
                  InputLabelProps={{ shrink: true }}
                  type='date'
                  required
                  label={translation.date}
                  variant='outlined'
                  name='date'
                  value={activity['date']}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionsContainer>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            size='large'
          >
            {loading ? <CircularProgress className='button-spinner' /> : translation.addActivity}
          </Button>
        </DialogActionsContainer>
      </form>
    )
  }
}

export default AddActivity
