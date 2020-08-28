import React from 'react'
import { Box, Button, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithProvider } from '../../actions'

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

const buttonsContainerStyle = {
  width: '100%'
}

const SocialMediaSignIn = () => {
  const { loading } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <Box style={boxStyle}>
      {loading && <CircularProgress />}
      {!loading &&
      <div style={buttonsContainerStyle}>
        <Button style={{marginBottom: '.5rem'}} variant='outlined' className='button-style full-width' color='default' onClick={() => dispatch(signInWithProvider('facebook'))}>{translation.signInWithFacebook}<i className="fab fa-facebook-f button-icon"></i></Button>
        <Button style={{ marginBottom: '.5rem' }} variant='outlined' className='button-style full-width' color='default' onClick={() => dispatch(signInWithProvider('google'))}>{translation.signInWithGoogle}<i className="fab fa-google button-icon"></i></Button>
      </div>}
    </Box>
  )
}

export default SocialMediaSignIn
