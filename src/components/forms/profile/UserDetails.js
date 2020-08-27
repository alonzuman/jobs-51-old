import React, { useState, useEffect } from 'react'
import { editProfile, setUser } from '../../../actions'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Box, Grid, CircularProgress, Avatar } from '@material-ui/core'
import FileUploader from '../../general/FileUploader'
import CircularProgressWithLabel from '../CircularProgressWithLabel'
import CircularSpinnerWithContainer from '../../layout/CircularSpinnerWithContainer'
import { app } from '../../../firebase'

const UserDetails = () => {
  const authState = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [email, setEmail] = useState(authState?.email)
  const [firstName, setFirstName] = useState(authState?.firstName)
  const [lastName, setLastName] = useState(authState?.lastName)
  const [phone, setPhone] = useState(authState?.phone)
  const [avatar, setAvatar] = useState(authState?.avatar)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authState) {
      setEmail(authState.email)
      setFirstName(authState.firstName)
      setLastName(authState.lastName)
      setPhone(authState.phone)
      setAvatar(authState.avatar)
      setLoading(false)
    }
  }, [authState])

  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      phone,
      avatar: avatar.length > 0 ? avatar : authState.avatar
    }
    dispatch(editProfile(user, authState.uid))
  }

  const boxStyle = {
    display: 'flex',
    alignItems: 'top',
  }

  const avatarStyle = {
    margin: '0 .5rem',
    height: '2.2rem',
    width: '2.2rem'
  }

  if (!authState || loading) {
    return <CircularSpinnerWithContainer />
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <Box style={boxStyle}>
          {uploading && <CircularProgressWithLabel value={progress} />}
          {!uploading && <FileUploader setProgress={setProgress} fileName={authState.avatar || uuidv4()} folder='avatars' setIsUploading={setUploading} setImageUrl={setAvatar} />}
          {(authState?.avatar?.trim().length > 0 || avatar?.trim().length > 0) && <Avatar style={avatarStyle} src={authState.avatar || avatar} alt={authState.firstName} />}
        </Box>
        <TextField disabled type='email' required variant='outlined' label={translation.email} value={email} onChange={e => setEmail(e.target.value)} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField required variant='outlined' label={translation.firstName} value={firstName} onChange={e => setFirstName(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField required variant='outlined' label={translation.lastName} value={lastName} onChange={e => setLastName(e.target.value)} />
          </Grid>
        </Grid>
        <TextField required variant='outlined' label={translation.phone} value={phone} onChange={e => setPhone(e.target.value)} />
        <Button className='button-style' variant='contained' color='primary' disabled={uploading} type='submit'>{authState.loading ? <CircularProgress className='button-spinner'/> : translation.update}</Button>
      </form>
    )
  }
}

export default UserDetails
