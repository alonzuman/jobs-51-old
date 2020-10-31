import { Button, Checkbox, CircularProgress, Dialog, DialogContent, FormControlLabel, FormGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../actions/users';
import LocationSelect from '../../components/forms/profile/LocationSelect';
import CustomDialogHeader from '../../components/layout/CustomDialogHeader';
import DialogActionsContainer from '../atoms/DialogActionsContainer';

const AreYouVolunteerDialog = () => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({})
  const [stateVolunteer, setVolunteer] = useState(false);
  const [stateRegion, setRegion] = useState('')
  const { translation } = useSelector(state => state.theme)
  const { messagesSeen, uid, region, volunteer } = useSelector(state => state.auth);
  const { isUpdating } = useSelector(state => state.users)
  const { regions } = useSelector(state => state.constants.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messagesSeen) {
      setOpen(!messagesSeen.includes('volunteer'))
      setVolunteer(volunteer || false)
      setRegion(region || '')
    }
  }, [messagesSeen, region])

  const handleSubmit = async () => {
    if (volunteer && !stateRegion) {
      setErrors({
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
    <Dialog dir='rtl' open={open} onClose={handleClose}>
      <CustomDialogHeader title={translation.areYouVolunteer} onClose={handleClose} />
      <DialogContent>
        <Typography className='mb-1' variant='body1'>{translation.justAFewQuestion}</Typography>
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
        {stateVolunteer && <LocationSelect error={Boolean(errors.region)} helperText={errors.region} size='small' label={translation.region} location={stateRegion} setLocation={setRegion} options={regions} />}
      </DialogContent>
      <DialogActionsContainer>
        <Button disabled={isUpdating} variant='contained' color='primary' onClick={handleSubmit}>{isUpdating ? <CircularProgress className='button-spinner' /> : translation.approve}</Button>
      </DialogActionsContainer>
    </Dialog>
  )
}

export default AreYouVolunteerDialog
