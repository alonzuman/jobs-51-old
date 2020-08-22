import React, { useState, useEffect } from 'react'
import { Grid, Button, Chip } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setGlobalFilters, closeDialogs, getFilters } from '../../actions'
import ChipsSkeleton from '../layout/ChipsSkeleton'

const MultiSelectionFilter = ({ type }) => {
  const dispatch = useDispatch()
  const jobsState = useSelector(state => state.jobs)
  const { translation } = useSelector(state => state.theme)
  const [selections, setSelections] = useState({})
  const [filters, setFilters] = useState([])

  const fetch = async () => {
    const res = await dispatch(getFilters(type))
    setSelections({...res})
    if (jobsState.filters && jobsState?.filters[type]) {
      setFilters(jobsState?.filters[type])
    }
  }

  useEffect(() => { fetch() }, [])

  const handleFilterClick = filter => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter])
    } else {
      setFilters([...filters.filter(x => x !== filter)])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setGlobalFilters({ [type]: filters }))
    dispatch(closeDialogs())
  }

  return (
    <div>
      <Grid container spacing={1}>
        {Object.keys(selections).length === 0 && <ChipsSkeleton />}
        {Object.keys(selections).length > 0 && Object.keys(selections).map((filter, index) => {
          if (Object.values(selections)[index] !== 0) {
            return (
              <Grid key={index} item>
                <Chip onClick={() => handleFilterClick(filter)} color={filters.includes(filter) ? 'primary' : 'default'} label={`${Object.keys(selections)[index]} (${Object.values(selections)[index]})`} />
              </Grid>
            )
          }
        })}
      </Grid>
      <br/>
      <Button variant='contained' color='primary' className='button-style' onClick={handleSubmit}>{translation.apply}</Button>
    </div>
  )
}
export default MultiSelectionFilter
