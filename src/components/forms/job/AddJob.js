import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TextField, Button, Grid, CircularProgress, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import FileUploader from '../../general/FileUploader'
import { useSelector, useDispatch } from 'react-redux'
import AddChips from '../AddChips'
import { addJob, addFilter, setFeedback } from '../../../actions'
import CircularProgressWithLabel from '../CircularProgressWithLabel'
import { Autocomplete } from '@material-ui/lab'
import { cities } from '../../../utils/constants/cities'
import { createFilterOptions } from '@material-ui/lab/Autocomplete';


const industries = [
  'תקשורת', 'הנדסה', 'הייטק'
]

const AddJob = () => {
  const dispatch = useDispatch()
  const [categoriesError, setCategoriesError] = useState('')
  const { uid, firstName, lastName, avatar, role, email, phone } = useSelector(state => state.auth)
  const { translation, direction } = useSelector(state => state.theme)
  const { loading } = useSelector(state => state.jobs)
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [job, setJob] = useState({
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    description: '',
  })

  const handleJobChange = e => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    })
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  const handleJobSubmit = e => {
    e.preventDefault()
    const jobToAdd = {
      ...job,
      image,
      industry,
      location,
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
    if (categories.length === 0) {
      setCategoriesError(translation.categoryError)
    } else {
      dispatch(addJob(jobToAdd))
    }
  }

  const thumbnailStyle = {
    width: '36px',
    height: '36px',
    objectFit: 'cover',
    margin: '0 1rem'
  }

  return (
    <form style={{ direction }} onSubmit={handleJobSubmit}>
      {isUploading && <CircularProgressWithLabel value={progress} />}
      {!isUploading && <FileUploader fileName={uuidv4()} folder='job-images' setImageUrl={setImage} setIsUploading={setIsUploading} setProgress={setProgress} />}
      {image.trim().length > 0 && <img style={thumbnailStyle} src={image} alt='Company avatar' />}
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField required label={translation.companyName} variant='outlined' value={job['company']} name='company' onChange={handleJobChange} />
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <InputLabel className='custom__input-label' id="demo-simple-select-helper-label">{translation.industry}</InputLabel>
            <Select labelId="demo-simple-select-helper-label" variant='outlined' value={industry} onChange={e => setIndustry(e.target.value)}>
              {industries.map((v, i) => <MenuItem value={v} key={i}>{v}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Autocomplete
            options={cities}
            filterOptions={filterOptions}
            handleHomeEndKeys
            autoHighlight
            value={location}
            onChange={(e, value) => setLocation(value)}
            noOptionsText={<span style={{ direction: 'rtl', textAlign: 'right', width: '100%' }}>No Results</span>}
            getOptionLabel={option => option}
            renderInput={params => <TextField {...params} label={translation.location} variant="outlined" />}
            renderOption={v => <div style={{ direction: 'rtl', textAlign: 'right', width: '100%' }} dir='rtl'>{v}</div>}
          />
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
      <AddChips error={Boolean(categoriesError)} helperText={categoriesError} collection='categories' chips={categories} setChips={setCategories} label={translation.categories} />
      <Button disabled={isUploading} className='button-style' variant='contained' color='primary' type='submit'>{loading ? <CircularProgress className='button-spinner' /> : translation.post}</Button>
    </form>
  )
}

export default AddJob
