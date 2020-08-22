import React, { useState } from 'react'
import { TextField, Button, Typography, CircularProgress, Divider, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, closeDialogs, openDialog, signInWithGoogle, signInWithFacebook } from '../../actions'
import FacebookIcon from '@material-ui/icons/Facebook';
import SocielMediaSignIn from './SocielMediaSignIn';


const SignIn = () => {
  const authState = useSelector(state => state.auth)
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
    textAlign: 'center'
  }

  const borderStyle = {

  }

  return (
    <>
    <SocielMediaSignIn />
    <Box style={boxStyle}>
      <Typography variant='body1'>{translation.or}</Typography>
    </Box>
    <form onSubmit={handleSubmit}>
      <TextField required type='email' label={translation.email} variant='outlined' value={email} onChange={e => setEmail(e.target.value)} />
      <TextField required type='password' label={translation.password} variant='outlined' value={password} onChange={e => setPassword(e.target.value)} />
      <Button className='button-style' color='primary' variant='contained' type='submit'>{authState.loading ? <CircularProgress className='button-spinner' /> : translation.signIn}</Button>
      <br />
      <br />
      <br />
      <br />
      <Typography variant='body1'>{translation.notSignedUp}<span style={anchorStyle} onClick={handleClick}> {translation.signUp}</span></Typography>
    </form>
    </>
  )
}

export default SignIn
