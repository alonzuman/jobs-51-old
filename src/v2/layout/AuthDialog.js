import { Button, CircularProgress, Dialog, DialogContent, Divider, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CustomDialogHeader from '../molecules/CustomDialogHeader'
import Transition from '../atoms/Transition';
import EmailSignIn from '../organisms/EmailSignIn';
import EmailSignUp from '../organisms/EmailSignUp';
import SocialMediaSignIn from '../organisms/SocialMediaSignIn';
import useCurrentUser from '../../hooks/useCurrentUser';

const AuthDialog = ({ open, onClose }) => {
  const [signingIn, setSigningIn] = useState(true)
  const { translation } = useSelector(state => state.theme)
  const { loading } = useCurrentUser()

  const handleSigningIn = () => setSigningIn(!signingIn)

  if (loading) {
    return (
      <Dialog dir='rtl' fullWidth TransitionComponent={Transition} open={open} onClose={onClose}>
        <CustomDialogHeader exitButton onClose={onClose} title={translation.signIn} />
        <DialogContent className='p-4 flex flex__column align__center justify__center'>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Dialog dir='rtl' fullWidth TransitionComponent={Transition} open={open} onClose={onClose}>
        <CustomDialogHeader exitButton onClose={onClose} title={translation.signIn} />
        <DialogContent className='mb-1 mt-1 flex flex__column align__center justify__center'>
          <SocialMediaSignIn />
          <div className='flex align__center mt-1 full__width'>
            <Divider className='flex__1 full__width' />
            <Typography className='mr-1 ml-1' variant='subtitle1'>{translation.or}</Typography>
            <Divider className='flex__1 full__width' />
          </div>
          {signingIn && <EmailSignIn />}
          {!signingIn && <EmailSignUp />}
          <Button className='pr-25 pl-25 pt-25 pb-25 mt-1' onClick={handleSigningIn}>{signingIn ? translation.notSignedUp : translation.alreadySignedUp}</Button>
        </DialogContent>
      </Dialog>
    )
  }
}

export default AuthDialog
