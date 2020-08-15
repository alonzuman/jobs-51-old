import React, { useState } from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { editJob, removeJob } from '../../actions'


const EditJob = () => {
  const dispatch = useDispatch()
  const { job } = useSelector(state => state.jobs)
  const { translation } = useSelector(state => state.theme)
  // Fields
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
    dispatch(editJob(newJob, job?.id))
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField required label={translation?.companyName} value={company} onChange={e => setCompany(e.target.value)} variant='outlined' />
        <TextField required label={translation?.type} value={type} onChange={e => setType(e.target.value)} variant='outlined' />
        <TextField required label={translation?.location} value={location} onChange={e => setLocation(e.target.value)} variant='outlined' />
        <TextField required label={translation?.contactPerson} value={contactPerson} onChange={e => setContactPerson(e.target.value)} variant='outlined' />
        <TextField required multiline rowsMax={4} label={translation?.description} value={description} onChange={e => setDescription(e.target.value)} variant='outlined' />
        {/* TODO */}
        <TextField required label={translation?.requirements} value={requirements} onChange={e => setRequirements(e.target.value)} variant='outlined' />
        <TextField required label={translation?.email} value={email} onChange={e => setEmail(e.target.value)} variant='outlined' />
        <TextField required label={translation?.phone} value={phone} onChange={e => setPhone(e.target.value)} variant='outlined' />
        <Button type='submit'>{translation?.post}</Button>
        <Button onClick={() => dispatch(removeJob(job.id))}>{translation?.removeJob}</Button>
      </form>
    </Box>
  )
}

export default EditJob
