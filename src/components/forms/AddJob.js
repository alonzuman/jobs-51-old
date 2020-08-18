import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Box, TextField, Button, CircularProgress, Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { addJob } from '../../actions'
import FileUploader from '../general/FileUploader'
import CircularProgressWithLabel from '../forms/CircularProgressWithLabel'
import AddChips from './AddChips';

const AddJob = () => {
  const { uid } = useSelector(state => state.auth )
  const { translation } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.jobs)
  const dispatch = useDispatch()

  // General
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Job fields
  const [imageUrl, setImageUrl] = useState('')
  const [company, setCompany] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState([])
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const buttonStyle = {
    float: 'left'
  }

  const handleSubmit = e => {
    e.preventDefault()

    const job = {
      image: imageUrl,
      company,
      type,
      location,
      contactPerson,
      description,
      requirements,
      email,
      phone,
      uid,
      dateCreated: new Date()
    }
    dispatch(addJob(job))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {uploading && <CircularProgressWithLabel value={progress} />}
        {!uploading && <FileUploader fileName={uuidv4()} folder={'job-images'} setProgress={setProgress} setIsUploading={setUploading} setImageUrl={setImageUrl} />}
        <TextField required label={translation?.companyName} value={company} onChange={e => setCompany(e.target.value)} variant='outlined' />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField required label={translation?.type} value={type} onChange={e => setType(e.target.value)} variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField required label={translation?.location} value={location} onChange={e => setLocation(e.target.value)} variant='outlined' />
          </Grid>
        </Grid>
        <TextField required label={translation?.contactPerson} value={contactPerson} onChange={e => setContactPerson(e.target.value)} variant='outlined' />
        <TextField required multiline rows={4} label={translation?.description} value={description} onChange={e => setDescription(e.target.value)} variant='outlined' />
        <AddChips label={translation?.requirements} chips={requirements} setChips={setRequirements} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField required label={translation?.email} value={email} onChange={e => setEmail(e.target.value)} variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField required label={translation?.phone} value={phone} onChange={e => setPhone(e.target.value)} variant='outlined' />
          </Grid>
        </Grid>
        <Button className='button-style' color='primary' variant='contained' style={buttonStyle} disabled={uploading} type='submit'>{loading ? <CircularProgress className='button-spinner' /> : translation?.post}</Button>
      </form>
    </Box>
  )
}

export default AddJob
