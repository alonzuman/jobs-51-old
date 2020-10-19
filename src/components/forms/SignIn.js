import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, CircularProgress, Box, FormGroup } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, closeDialogs, openDialog, setTempToken } from '../../actions'
import SocialMediaSignIn from './SocialMediaSignIn';
import { getConstants } from '../../actions/constants';


const SignIn = () => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const [tokenApproved, setTokenApproved] = useState(false)
  const [socialMedia, setSocialMedia] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { translation, theme } = useSelector(state => state.theme)
  const [inputToken, setInputToken] = useState('')
  const [inputTokenError, setInputTokenError] = useState('')
  const allTokens = useSelector(state => state?.constants?.tokens?.all)

  useEffect(() => {
    dispatch(getConstants())
  }, [])

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

  const handleTokenClick = () => {
    console.log(allTokens)
    if (Object.keys(allTokens).includes(inputToken)) {
      console.log(allTokens)
      dispatch(setTempToken(inputToken))
      setTokenApproved(true)
    } else {
      setInputTokenError(translation.inputTokenErrorMsg)
    }
  }

  if (!tokenApproved) {
    return (
      <FormGroup className='mt-5'>
        <TextField error={Boolean(inputTokenError)} helperText={inputTokenError} label={translation.accessToken} variant='outlined' value={inputToken} onChange={e => setInputToken(e.target.value)} />
        <Button disabled={!inputToken} className='full-width' color='primary' variant='contained' onClick={handleTokenClick}>{translation.continue}</Button>
      </FormGroup>
    )
  } else {
    return (
      <>
      {socialMedia &&
      <>
        <SocialMediaSignIn />
        <Box style={boxStyle}>
          <Typography variant='body1'>{translation.or}</Typography>
        </Box>
        <Button disabled={authState.loading} variant='outlined' className='button-style full-width' onClick={() => setSocialMedia(false)}>{translation.signInWithEmail}<i className="fas fa-envelope button-icon"></i></Button>
      </>}
      {!socialMedia &&
      <form onSubmit={handleSubmit}>
        <Button disabled={authState.loading} variant='outlined' className='button-style full-width' onClick={() => setSocialMedia(true)}>{translation.signInWithSocialMedia}<i className="fas fa-users button-icon"></i></Button>
        <br />
        <br />
        <Box style={boxStyle}>
          <Typography variant='body1'>{translation.orWithEmail}</Typography>
        </Box>
        <TextField required type='email' label={translation.email} variant='outlined' value={email} onChange={e => setEmail(e.target.value)} />
        <TextField required type='password' label={translation.password} variant='outlined' value={password} onChange={e => setPassword(e.target.value)} />
        <Button disabled={authState.loading} className='button-style' color='primary' variant='contained' type='submit'>{authState.loading ? <CircularProgress className='button-spinner' /> : translation.signIn}</Button>
        <br />
        <br />
        <br />
        <br />
        <Typography variant='body1'>{translation.notSignedUp}<span style={anchorStyle} onClick={handleClick}>{translation.signUp}</span></Typography>
      </form>}
      </>
    )
  }
}

export default SignIn
