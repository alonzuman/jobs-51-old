import React, { useState } from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { addJob, setAlert } from '../../actions'

const AddJob = () => {
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  // TODO Multi steps
  const [step, setStep] = useState(0)

  // Job fields
  const [company, setCompany] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState([])
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const job = {
      company,
      type,
      location,
      contactPerson,
      description,
      requirements,
      email,
      phone,
      dateCreated: new Date()
    }
    dispatch(addJob(job))
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
      </form>
    </Box>
  )
}

export default AddJob
