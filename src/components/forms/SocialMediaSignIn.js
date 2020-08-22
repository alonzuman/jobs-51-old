import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithFacebook, signInWithGoogle } from '../../actions'

const signInWithStyle = {
  marginBottom: '.5rem'
}

const SocialMediaSignIn = () => {
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <Box>
      <br/>
      <Button variant='outlined' style={signInWithStyle} className='button-style' color='default' onClick={() => dispatch(signInWithFacebook())}>{translation.signInWithFacebook}<i className="fab fa-facebook-f button-icon"></i></Button>
      <br/>
      <Button variant='outlined' style={signInWithStyle} className='button-style' color='default' onClick={() => dispatch(signInWithGoogle())}>{translation.signInWithGoogle}<i className="fab fa-google button-icon"></i></Button>
      <br/>
    </Box>
  )
}

export default SocialMediaSignIn
