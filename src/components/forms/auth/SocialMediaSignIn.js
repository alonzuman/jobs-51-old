import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithProvider } from '../../../actions'
import Container from '../../../v2/atoms/Container'

const SocialMediaSignIn = () => {
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleGoogleSignIn = () => {
    dispatch(signInWithProvider('google'))
  }

  const handleFacebookSignIn = () => {
    dispatch(signInWithProvider('facebook'))
  }

  return (
    <Container className='full__width pb-0 m-0 pt-0'>
      <Button size='large' variant='outlined' className='mb-5 button-style full-width' color='default' onClick={handleFacebookSignIn}>{translation.signInWithFacebook}<i className="fab fa-facebook-f button-icon"></i></Button>
      <Button size='large' variant='outlined' className='button-style full-width' color='default' onClick={handleGoogleSignIn}>{translation.signInWithGoogle}<i className="fab fa-google button-icon"></i></Button>
    </Container>
  )
}

export default SocialMediaSignIn
