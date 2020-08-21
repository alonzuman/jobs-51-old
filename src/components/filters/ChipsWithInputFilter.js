import React, { useState } from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import SelectionChip from './SelectionChip'

const dummyData = [
  'UX/UI', 'Photoshop', 'Web Developer', 'Design', 'Music', 'שמירה', 'Security'
]

const ChipsWithInputFilter = () => {
  const { translation } = useSelector(state => state.theme)
  const [filters, setFilters] = useState([])

  const handleFilterClick = filter => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter])
    } else {
      setFilters([...filters.filter(x => x!== filter)])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Dispatch setFilters by key and value
    console.log(filters)
  }

  return (
    <div>
      {/* TODO autocomplete */}
      {/* <TextField  /> */}
      <Grid container spacing={1}>
        {dummyData.map((filter, index) =>
          <Grid key={index} item onClick={() => handleFilterClick(filter)}>
            <SelectionChip label={filter} />
          </Grid>)}
      </Grid>
      <br/>
      <Button variant='contained' color='primary' className='button-style' onClick={handleSubmit}>{translation.apply}</Button>
    </div>
  )
}
export default ChipsWithInputFilter
