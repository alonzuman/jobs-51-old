import { Button, Checkbox, CircularProgress, Dialog, DialogContent, FormControlLabel, FormGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../actions/users';
import LocationSelect from '../molecules/LocationSelect';
import CustomDialogHeader from '../molecules/CustomDialogHeader';
import DialogActionsContainer from '../atoms/DialogActionsContainer';
import { getLocations } from '../../actions';
import useCurrentUser from '../../hooks/useCurrentUser';

const AreYouVolunteerDialog = () => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({})
  const [stateVolunteer, setVolunteer] = useState(true);
  const [stateRegion, setRegion] = useState('')
  const { translation } = useSelector(state => state.theme)
  const { isAuthenticated, messagesSeen, uid, region, volunteer } = useCurrentUser();
  const { isUpdating } = useSelector(state => state.users)
  const { isFetching, isFetched, regions } = useSelector(state => state.constants?.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (!region || !messagesSeen?.includes('volunteer')) {
        setOpen(true)
      }
      setVolunteer(volunteer || false)
      setRegion(region || '')
    }
  }, [messagesSeen, region])

  useEffect(() => { dispatch(getLocations()) }, [])

  const handleSubmit = async () => {
    if (stateVolunteer && !stateRegion) {
      return setErrors({
        ...errors,
        region: translation.pleaseFillField
      })
    } else {
      const newUser = {
        uid,
        messagesSeen: [
          'volunteer'
        ],
        volunteer: stateVolunteer,
        region: stateRegion
      }
      await dispatch(updateUser(newUser))
      await handleClose()
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog fullWidth dir='rtl' open={open}>
      <CustomDialogHeader title={translation.smallQuestion} />
      <DialogContent>
        {isFetching && <CircularProgress />}
        {isFetched &&
          <>
            <Typography variant='body1'>{translation.areYouVolunteer}</Typography>
            <FormGroup row className='mb-5'>
              <FormControlLabel
                control={<Checkbox color='primary' name='lookingForJob' onChange={e => setVolunteer(true)} checked={stateVolunteer} />}
                label={translation.yes}
              />
              <FormControlLabel
                control={<Checkbox color='primary' name='lookingForJob' onChange={e => setVolunteer(false)} checked={!stateVolunteer} />}
                label={translation.no}
              />
            </FormGroup>
            {stateVolunteer && <LocationSelect loading={isFetching} error={Boolean(errors.region)} helperText={errors.region} size='small' label={translation.region} location={stateRegion} setLocation={setRegion} options={regions} />}
          </>}
      </DialogContent>
      <DialogActionsContainer>
        <Button disabled={isUpdating} variant='contained' color='primary' onClick={handleSubmit}>{isUpdating ? <CircularProgress className='button-spinner' /> : translation.approve}</Button>
      </DialogActionsContainer>
    </Dialog>
  )
}

export default AreYouVolunteerDialog
