import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { signUp, closeDialogs, openSigningIn, setAlert } from '../../actions'
import { TextField, Button, Typography, Box, Grid, CircularProgress } from '@material-ui/core'
import FileUploader from '../general/FileUploader'
import CircularProgressWithLabel from './CircularProgressWithLabel'

const SignUp = () => {
  const { translation, theme } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== confirmPassword) return dispatch(setAlert({ type: 'error', msg: 'Passwords dont match' }))
    const user = {
      email,
      password,
      firstName,
      lastName,
      phone,
      avatar
    }
    dispatch(signUp(user))
  }

  const handleClick = () => {
    dispatch(closeDialogs())
    dispatch(openSigningIn())
  }

  const boxStyle = {
    display: 'flex',
    alignItems: 'top'
  }

  const thumbnailStyle = {
    width: '36px',
    height: '36px',
    objectFit: 'cover',
    margin: '0 1rem'
  }

  const formStyle = {
    minHeight: '220px'
  }

  const anchorStyle = {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    cursor: 'pointer'
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <Box style={boxStyle}>
        {uploading && <CircularProgressWithLabel value={progress} />}
        {!uploading && <FileUploader setProgress={setProgress} fileName={uuidv4()} folder='avatars' setIsUploading={setUploading} setImageUrl={setAvatar} />}
        {avatar.trim().length > 0 && <img style={thumbnailStyle} src={avatar} />}
      </Box>
      <TextField type='email' required variant='outlined' label={translation.email} value={email} onChange={e => setEmail(e.target.value)} />
      <TextField type='password' required variant='outlined' label={translation.password} value={password} onChange={e => setPassword(e.target.value)} />
      <TextField type='password' required variant='outlined' label={translation.confirmPassword} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField required variant='outlined' label={translation.firstName} value={firstName} onChange={e => setFirstName(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <TextField required variant='outlined' label={translation.lastName} value={lastName} onChange={e => setLastName(e.target.value)} />
        </Grid>
      </Grid>
      <TextField required variant='outlined' label={translation.phone} value={phone} onChange={e => setPhone(e.target.value)} />
      <Button className='button-style' variant='contained' color='primary' disabled={uploading} type='submit'>{authState.loading ? <CircularProgress className='button-spinner' /> : translation.signUp}</Button>
      <br/>
      <br/>
      <br/>
      <Typography variant='body1'>{translation.alreadySignedUp}<span style={anchorStyle} onClick={handleClick}> {translation.signIn}</span></Typography>
    </form>
  )
}

export default SignUp
