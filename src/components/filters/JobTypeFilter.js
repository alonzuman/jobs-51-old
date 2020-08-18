import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobTypes, getJobs } from '../../actions/jobs'
import { CircularProgress, Grid, Chip, Button, Box } from '@material-ui/core'
import { closeDialogs } from '../../actions'

const JobTypeFilter = () => {
  const dispatch = useDispatch()
  const { translation, theme } = useSelector(state => state.theme)
  const { jobTypes, filtersLoading } = useSelector(state => state.jobs)
  const [chosenFilters, setChosenFilters] = useState([])

  const handleChosenFilter = (newFilter) => {
    if (!chosenFilters.includes(newFilter)) {
      setChosenFilters([...chosenFilters, newFilter])
    } else {
      setChosenFilters([...chosenFilters.filter(fil => fil !== newFilter)])
    }
  }

  useEffect(() => {
    dispatch(getJobTypes())
  }, [dispatch])

  const handleSubmit = () => {
    dispatch(getJobs({ type: chosenFilters }))
    dispatch(closeDialogs())
  }

  const chipStyle = {
    border: '1px solid transparent'
  }

  const chosenChipStyle = {
    border: `1px solid ${theme.palette.primary.main}`
  }

  return (
    <Box>
      {filtersLoading && <CircularProgress />}
      {!filtersLoading &&
      <Grid container spacing={1}>
        {jobTypes?.length > 0 && jobTypes.map((jobType, index) =>
        <Grid key={index} item>
          <Chip style={chosenFilters.includes(jobType) ? chosenChipStyle : chipStyle} label={jobType} onClick={() => handleChosenFilter(jobType)} />
        </Grid>
      )}
      </Grid>}
      <br />
      <Button className='full-width' color='primary' variant='contained' onClick={handleSubmit}>{translation.apply}</Button>
    </Box>
  )
}

export default JobTypeFilter
