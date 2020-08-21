import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Button } from '@material-ui/core'
import FileUploader from '../../general/FileUploader'
import { app } from '../../../firebase'
import { useSelector } from 'react-redux'

const AddJob = () => {
  const { uid } = useSelector(state => state.auth)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
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
      uid
    }
    console.log(jobToAdd)
  }

  return (
    <form onSubmit={handleJobSubmit}>
      <FileUploader fileName={uuidv4()} folder='job-images' setImageUrl={setImage} setIsUploading={setIsUploading} setProgress={setProgress} />
      <TextField value={job['company']} name='company' onChange={handleJobChange} />
      <TextField value={job['contactPerson']} name='contactPerson' onChange={handleJobChange} />
      <TextField value={job['email']} name='email' onChange={handleJobChange} />
      <TextField value={job['phone']} name='phone' onChange={handleJobChange} />
      <TextField value={job['description']} name='description' onChange={handleJobChange} />
      <TextField value={job['location']} name='location' onChange={handleJobChange} />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default AddJob
