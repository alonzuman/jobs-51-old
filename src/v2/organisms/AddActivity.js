import React, { useContext, useEffect } from 'react'
import { Button, TextField, Grid, Typography, CircularProgress, FormControl, DialogContent, FormHelperText } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityTypes, getLocations } from '../../actions';
import DialogActionsContainer from '../atoms/DialogActionsContainer';
import CustomChip from '../atoms/CustomChip';
import LocationSelect from '../molecules/LocationSelect';
import { AddActivityContext } from '../../contexts/AddActivityContext';

const AddActivity = () => {
  const { translation } = useSelector(state => state.theme)
  const { locations, activityTypes } = useSelector(state => state.constants)
  const { isFetched: locationsFetched, isFetching: locationsFetching, regions } = locations;
  const { isFetched: activityTypesFetched, isFetching: activityTypesFetching } = activityTypes;
  const { isUpdating } = useSelector(state => state.activities.activities)
  const { activity, errors, handleActivityChange, handleSubmit } = useContext(AddActivityContext)
  const dispatch = useDispatch()
  const loading = locationsFetching || activityTypesFetching

  useEffect(() => {
    if (!locationsFetched) {
      dispatch(getLocations())
    }
  }, [])

  useEffect(() => {
    if (!activityTypesFetched) {
      dispatch(getActivityTypes())
    }
  }, [])

  if (loading) {
    return (
      <DialogContent className='flex align__center justify__center mnw-256 mnh-256'>
        <CircularProgress />
      </DialogContent>
    )
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <LocationSelect
            options={regions}
            location={activity.region}
            setLocation={value => handleActivityChange('region', value)}
            loading={loading}
            size='small'
            disabled={!!activity.region}
          />
          <FormControl>
            <Typography variant='subtitle1'>{translation.type}</Typography>
            <Grid container spacing={1}>
              {activityTypes?.all?.map((type, index) => (
                <Grid key={index} item>
                  <CustomChip
                    onClick={() => handleActivityChange('type', type)}
                    label={type}
                    color={activity['type'] === type ? 'primary' : 'default'}
                  />
                </Grid>
              ))}
            </Grid>
            <FormHelperText error={Boolean(errors.type)}>{errors.type}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              size='small'
              label={translation.description}
              placeholder={translation.activityDescriptionPlaceholder}
              variant='outlined'
              multiline
              helperText={errors.description}
              error={Boolean(errors.description)}
              rows={3}
              name='description'
              value={activity.description}
              onChange={e => handleActivityChange('description', e.target.value)}
            />
          </FormControl>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  size='small'
                  helperText={errors.total}
                  error={Boolean(errors.total)}
                  value={activity.total}
                  label={translation.totalHours}
                  variant='outlined'
                  onChange={e => handleActivityChange('total', e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  size='small'
                  InputLabelProps={{ shrink: true }}
                  type='date'
                  label={translation.date}
                  variant='outlined'
                  value={activity.date}
                  onChange={e => handleActivityChange('date', e.target.value)}
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
            {isUpdating ? <CircularProgress className='button-spinner' /> : translation.addActivity}
          </Button>
        </DialogActionsContainer>
      </form>
    )
  }
}

export default AddActivity
