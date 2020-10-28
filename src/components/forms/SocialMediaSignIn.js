import React from 'react'
import { Box, Button, CircularProgress, DialogContent } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithProvider } from '../../actions'

const SocialMediaSignIn = () => {
  const { loading } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleGoogleSignIn = () => {
    dispatch(signInWithProvider('google'))
  }

  const handleFacebookSignIn = () => {
    dispatch(signInWithProvider('facebook'))
  }


  if (loading) {
    return (
      <DialogContent className='mb-1 mt-1 flex align__center justify__center mnh-144'>
        <CircularProgress />
      </DialogContent>
    )
  } else {
    return (
      <DialogContent className='mb-1 mt-1'>
        <Button variant='outlined' className='mb-5 button-style full-width' color='default' onClick={handleFacebookSignIn}>{translation.signInWithFacebook}<i className="fab fa-facebook-f button-icon"></i></Button>
        <Button variant='outlined' className='button-style full-width' color='default' onClick={handleGoogleSignIn}>{translation.signInWithGoogle}<i className="fab fa-google button-icon"></i></Button>
      </DialogContent>
    )
  }
}

export default SocialMediaSignIn
