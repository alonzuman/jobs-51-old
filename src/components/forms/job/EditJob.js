import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core'
import FileUploader from '../../general/FileUploader'
import { useSelector, useDispatch } from 'react-redux'
import AddChips from '../AddChips'
import { addJob, editJob } from '../../../actions'
import FormSkeleton from '../FormSkeleton'

const AddJob = () => {
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.auth)
  const { translation, direction } = useSelector(state => state.theme)
  const { loading, job } = useSelector(state => state.jobs)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [edittedJob, setEdittedJob] = useState({})

  useEffect(() => {
    setEdittedJob({
      image: job?.image,
      company: job?.company,
      contactPerson: job?.contactPerson,
      email: job?.email,
      phone: job?.phone,
      location: job?.location,
      description: job?.description,
    })
    setCategories(job?.categories)
  }, [job])

  const handleJobChange = e => {
    setEdittedJob({
      ...edittedJob,
      [e.target.name]: e.target.value
    })
  }

  const handleJobSubmit = e => {
    e.preventDefault()
    const jobToAdd = {
      ...edittedJob,
      image,
      categories,
      uid
    }
    dispatch(editJob(jobToAdd, job.id))
  }

  return (
    <form style={{ direction }} onSubmit={handleJobSubmit}>
      {loading && <FormSkeleton />}
      {!loading && job &&
      <>
      <FileUploader fileName={uuidv4()} folder='job-images' setImageUrl={setImage} setIsUploading={setIsUploading} setProgress={setProgress} />
        <TextField label={translation.companyName} variant='outlined' value={edittedJob['company']} name='company' onChange={handleJobChange} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
            <TextField label={translation.location} variant='outlined' value={edittedJob['location']} name='location' onChange={handleJobChange} />
        </Grid>
        <Grid item xs={6}>
            <TextField label={translation.contactPerson} variant='outlined' value={edittedJob['contactPerson']} name='contactPerson' onChange={handleJobChange} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
            <TextField label={translation.email} variant='outlined' value={edittedJob['email']} name='email' onChange={handleJobChange} />
        </Grid>
        <Grid item xs={6}>
            <TextField label={translation.phone} variant='outlined' value={edittedJob['phone']} name='phone' onChange={handleJobChange} />
        </Grid>
      </Grid>
        <TextField multiline rows={4} label={translation.description} variant='outlined' value={edittedJob['description']} name='description' onChange={handleJobChange} />
      <AddChips chips={categories} setChips={setCategories} label={translation.categories} />
      <Button disabled={isUploading} className='button-style' variant='contained' color='primary' type='submit'>{loading ? <CircularProgress className='button-spinner' /> : translation.post}</Button>
      </>}
    </form>
  )
}

export default AddJob
