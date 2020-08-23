import React from 'react'
import { Box, Button, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithFacebook, signInWithGoogle } from '../../actions'

const signInWithStyle = {
  marginBottom: '.5rem'
}

const boxStyle = {
  textAlign: 'center'
}

const buttonStyle = {
  padding: '1rem',
  marginBottom: '.5rem'
}

const SocialMediaSignIn = () => {
  const { loading } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <Box style={boxStyle}>
      {loading && <CircularProgress />}
      {!loading &&
      <>
        <Button style={buttonStyle} variant='outlined' style={signInWithStyle} className='button-style' color='default' onClick={() => dispatch(signInWithFacebook())}>{translation.signInWithFacebook}<i className="fab fa-facebook-f button-icon"></i></Button>
        <Button variant='outlined' style={signInWithStyle} className='button-style' color='default' onClick={() => dispatch(signInWithGoogle())}>{translation.signInWithGoogle}<i className="fab fa-google button-icon"></i></Button>
      </>}
    </Box>
  )
}

export default SocialMediaSignIn
