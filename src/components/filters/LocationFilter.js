import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobLocations, getJobs } from '../../actions/jobs'
import { CircularProgress, Grid, Chip, Button, Box } from '@material-ui/core'
import { closeDialogs } from '../../actions'

const LocationFilter = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { loading, jobLocations } = useSelector(state => state.jobs)
  const [chosenFilters, setChosenFilters] = useState([])


  const handleChosenFilter = (newFilter) => {
    if (!chosenFilters.includes(newFilter)) {
      setChosenFilters([...chosenFilters, newFilter])
    } else {
      setChosenFilters([...chosenFilters.filter(fil => fil !== newFilter)])
    }
  }

  useEffect(() => {
    dispatch(getJobLocations())
  }, [dispatch])

  const handleSubmit = () => {
    dispatch(getJobs({ location: chosenFilters }))
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
    <Box>
      {loading && <CircularProgress />}
      {!loading &&
        <Grid container spacing={1}>
          {jobLocations?.length > 0 && jobLocations.map((jobLocation, index) =>
            <Grid key={index} item>
              <Chip style={chosenFilters.includes(jobLocation) ? chosenChipStyle : chipStyle} label={jobLocation} onClick={() => handleChosenFilter(jobLocation)} />
            </Grid>
          )}
        </Grid>}
      <br />
      <Button className='full-width' color='primary' variant='outlined' onClick={handleSubmit}>{translation.apply}</Button>
    </Box>
  )
}

export default LocationFilter
