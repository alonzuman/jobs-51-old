import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core'
import FileUploader from '../../general/FileUploader'
import { useSelector, useDispatch } from 'react-redux'
import AddChips from '../AddChips'
import { addJob, addFilter } from '../../../actions'
import CircularProgressWithLabel from '../CircularProgressWithLabel'

const AddJob = () => {
  const dispatch = useDispatch()
  const { uid, firstName, lastName, avatar, role, email, phone } = useSelector(state => state.auth)
  const { translation, direction } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.jobs)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [job, setJob] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    description: '',
  })

  const handleJobChange = e => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    })
  }

  const handleJobSubmit = e => {
    e.preventDefault()
    const jobToAdd = {
      ...job,
      image,
      categories,
      uid,
      user: {
        firstName,
        lastName,
        role,
        email,
        phone,
        avatar
      }
    }
    dispatch(addFilter({ collection: 'locations', value: jobToAdd.location }))
    dispatch(addJob(jobToAdd))
  }

  const thumbnailStyle = {
    width: '36px',
    height: '36px',
    objectFit: 'cover',
    margin: '0 1rem'
  }

  return (
    <form style={{direction}} onSubmit={handleJobSubmit}>
      {isUploading && <CircularProgressWithLabel value={progress} />}
      {!isUploading && <FileUploader fileName={uuidv4()} folder='job-images' setImageUrl={setImage} setIsUploading={setIsUploading} setProgress={setProgress} />}
      {image.trim().length > 0 && <img style={thumbnailStyle} src={image} />}
      <TextField required label={translation.companyName} variant='outlined' value={job['company']} name='company' onChange={handleJobChange} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField required label={translation.location} variant='outlined' value={job['location']} name='location' onChange={handleJobChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField required label={translation.contactPerson} variant='outlined' value={job['contactPerson']} name='contactPerson' onChange={handleJobChange} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField required label={translation.email} variant='outlined' value={job['email']} name='email' onChange={handleJobChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField required label={translation.phone} variant='outlined' value={job['phone']} name='phone' onChange={handleJobChange} />
        </Grid>
      </Grid>
      <TextField required multiline rows={4} label={translation.description} variant='outlined' value={job['description']} name='description' onChange={handleJobChange} />
      <AddChips collection='categories' chips={categories} setChips={setCategories} label={translation.categories}  />
      <Button disabled={isUploading} className='button-style' variant='contained' color='primary' type='submit'>{loading ? <CircularProgress className='button-spinner' /> : translation.post}</Button>
    </form>
  )
}

export default AddJob
