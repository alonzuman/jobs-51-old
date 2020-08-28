import React, { useState } from 'react'
import { TextField, Button, Typography, CircularProgress, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, closeDialogs, openDialog } from '../../actions'
import FacebookIcon from '@material-ui/icons/Facebook';
import SocialMediaSignIn from './SocialMediaSignIn';


const SignIn = () => {
  const authState = useSelector(state => state.auth)
  const [socialMedia, setSocialMedia] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { translation, theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(signIn({ email, password }))
  }

  const handleClick = () => {
    dispatch(closeDialogs())
    dispatch(openDialog({ type: 'SignUp', title: 'signUp' }))
  }

  const anchorStyle = {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    cursor: 'pointer'
  }

  const boxStyle = {
    textAlign: 'center',
    margin: '.5rem 0'
  }

  return (
    <>
    {socialMedia &&
    <>
      <SocialMediaSignIn />
      <Box style={boxStyle}>
        <Typography variant='body1'>{translation.or}</Typography>
      </Box>
      <Button variant='outlined' className='button-style full-width' onClick={() => setSocialMedia(false)}>{translation.signInWithEmail}<i className="fas fa-envelope button-icon"></i></Button>
    </>}
    {!socialMedia &&
    <form onSubmit={handleSubmit}>
      <Button variant='outlined' className='button-style full-width' onClick={() => setSocialMedia(true)}>{translation.signInWithSocialMedia}<i className="fas fa-users button-icon"></i></Button>
      <br />
      <br />
      <Box style={boxStyle}>
        <Typography variant='body1'>{translation.orWithEmail}</Typography>
      </Box>
      <TextField required type='email' label={translation.email} variant='outlined' value={email} onChange={e => setEmail(e.target.value)} />
      <TextField required type='password' label={translation.password} variant='outlined' value={password} onChange={e => setPassword(e.target.value)} />
      <Button className='button-style' color='primary' variant='contained' type='submit'>{authState.loading ? <CircularProgress className='button-spinner' /> : translation.signIn}</Button>
      <br />
      <br />
      <br />
      <br />
      <Typography variant='body1'>{translation.notSignedUp}<span style={anchorStyle} onClick={handleClick}> {translation.signUp}</span></Typography>
    </form>}
    </>
  )
}

export default SignIn
