import React, { useState } from 'react'
import { Box, TextField, Button, CircularProgress, Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { editJob, removeJob } from '../../actions'
import { v4 as uuidv4} from 'uuid'
import FileUploader from '../general/FileUploader'
import CircularProgressWithLabel from '../forms/CircularProgressWithLabel'
import AddChips from './AddChips'


const EditJob = () => {
  const dispatch = useDispatch()
  const { job, loading } = useSelector(state => state.jobs)
  const { translation, theme } = useSelector(state => state.theme)

  // General
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Fields
  const [imageUrl, setImageUrl] = useState(job?.iamge)
  const [company, setCompany] = useState(job?.company)
  const [type, setType] = useState(job?.type)
  const [location, setLocation] = useState(job?.location)
  const [contactPerson, setContactPerson] = useState(job?.contactPerson)
  const [description, setDescription] = useState(job?.description)
  const [requirements, setRequirements] = useState(job?.requirements)
  const [email, setEmail] = useState(job?.email)
  const [phone, setPhone] = useState(job?.phone)

  const handleSubmit = e => {
    e.preventDefault()

    const newJob = {
      image: imageUrl ? imageUrl : '',
      company,
      type,
      location,
      contactPerson,
      description,
      requirements,
      email,
      phone,
      id: job.id
    }
    console.log(newJob)

    dispatch(editJob(newJob, job?.id))
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
        <TextField required multiline rowsMax={4} label={translation?.description} value={description} onChange={e => setDescription(e.target.value)} variant='outlined' />
        <AddChips label={translation?.requirements} chips={requirements} setChips={setRequirements} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField required label={translation?.email} value={email} onChange={e => setEmail(e.target.value)} variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField required label={translation?.phone} value={phone} onChange={e => setPhone(e.target.value)} variant='outlined' />
          </Grid>
        </Grid>
        <Button className='button-style' variant='contained' color='primary' type='submit'>{loading ? <CircularProgress className='button-spinner' /> : translation?.post}</Button>
        <Button style={{ backgroundColor: theme.palette.error.main }} className='button-style' variant='outlined' onClick={() => dispatch(removeJob(job?.id, job))}>{loading ? <CircularProgress className='button-spinner'/> : translation?.removeJob}</Button>
      </form>
    </Box>
  )
}

export default EditJob
