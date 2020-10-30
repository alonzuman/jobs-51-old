import { Dialog, DialogContent } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getConstants } from '../../actions/constants';
import SocialMediaSignIn from '../../components/forms/SocialMediaSignIn'
import CustomDialogHeader from '../../components/layout/CustomDialogHeader'
import useWindowSize from '../../hooks/useWindowSize';
import Transition from '../atoms/Transition';

const AuthDialog = ({ open, onClose }) => {
  const { translation } = useSelector(state => state.theme)
  const { windowWidth: width } = useWindowSize()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConstants())
  }, [])

  return (
    <Dialog dir='rtl' fullWidth TransitionComponent={Transition} open={open} onClose={onClose}>
      <CustomDialogHeader exitButton onClose={onClose} title={translation.signIn} />
      <DialogContent className='mb-1 mt-1 flex align__center justify__center'>
        <SocialMediaSignIn />
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
