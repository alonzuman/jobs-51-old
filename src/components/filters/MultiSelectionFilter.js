import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import SelectionChip from './SelectionChip'
import { setGlobalFilters, closeDialogs } from '../../actions'

const MultiSelectionFilter = ({ type, values }) => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const [filters, setFilters] = useState([])

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
        {values.map((filter, index) =>
          <Grid key={index} item onClick={() => handleFilterClick(filter)}>
            <SelectionChip label={filter} />
          </Grid>)}
      </Grid>
      <br/>
      <Button variant='contained' color='primary' className='button-style' onClick={handleSubmit}>{translation.apply}</Button>
    </div>
  )
}
export default MultiSelectionFilter
