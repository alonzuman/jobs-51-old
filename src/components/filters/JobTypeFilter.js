import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobTypes, getJobs } from '../../actions/jobs'
import { CircularProgress, Grid, Chip, Button } from '@material-ui/core'
import { closeDialogs } from '../../actions'

const JobTypeFilter = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { jobTypes, loading } = useSelector(state => state.jobs)
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
  }, [])

  const handleSubmit = () => {
    dispatch(getJobs({ type: chosenFilters }))
    dispatch(closeDialogs())
  }

  const chipStyle = {
    border: '1px solid transparent'
  }

  const chosenChipStyle = {
    // TODO connect to theme color
    border: `1px solid black`
  }

  return (
    <>
      {loading && <CircularProgress />}
      {!loading &&
      <Grid container spacing={1}>
        {jobTypes?.length > 0 && jobTypes.map((jobType, index) =>
        <Grid key={index} item>
          <Chip style={chosenFilters.includes(jobType) ? chosenChipStyle : chipStyle} label={jobType} onClick={() => handleChosenFilter(jobType)} />
        </Grid>
      )}
      </Grid>}
      <br />
      <Button className='full-width' color='primary' variant='outlined' onClick={handleSubmit}>{translation.apply}</Button>
    </>
  )
}

export default JobTypeFilter
