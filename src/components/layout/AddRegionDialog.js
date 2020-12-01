import { Button, CircularProgress, Dialog, DialogContent } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../actions'
import { updateUser } from '../../actions/users'
import LocationSelect from '../molecules/LocationSelect'
import CustomDialogHeader from '../molecules/CustomDialogHeader'
import DialogActionsContainer from '../atoms/DialogActionsContainer'

const AddRegionDialog = ({ isOpen, onClose }) => {
  const { translation } = useSelector(state => state.theme);
  const { isUpdating } = useSelector(state => state.users);
  const { uid } = useCurrentUser();
  const { regions } = useSelector(state => state.constants);
  const [error, setError] = useState('')
  const [region, setRegion] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    if (region) {
      const newUser = {
        uid,
        region,
        volunteer: true
      }
      await dispatch(updateUser(newUser))
      await onClose()
    } else if (!region) {
      setError(translation.pleaseFillField)
    }
  }

  return (
    <Dialog dir='rtl' open={isOpen}>
      <CustomDialogHeader title={translation.pleaseSetYourRegion} />
      <DialogContent>
        <LocationSelect
          helperText={translation.afterSetOnlyAdminCanChange}
          error={Boolean(error)}
          label={translation.activityRegion}
          size='small'
          location={region}
          setLocation={setRegion}
          className='full__width mt-1'
          options={regions}
        />
      </DialogContent>
      <DialogActionsContainer>
        <Button disabled={!region} onClick={handleSubmit} className='full__width' color='primary' variant='contained'>
          {isUpdating ? <CircularProgress className='button-spinner' /> : translation.approve}
        </Button>
      </DialogActionsContainer>
    </Dialog>
  )
}

export default AddRegionDialog
