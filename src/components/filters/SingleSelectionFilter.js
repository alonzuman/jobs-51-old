import React, { useState } from 'react'
import { Grid, Chip, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalFilters, closeDialogs } from '../../actions'

const SingleSelectionFilter = ({ type, values }) => {
  const { translation } = useSelector(state => state.theme)
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setGlobalFilters({ [type]: filter}))
    dispatch(closeDialogs())
  }

  return (
    <div>
      <Grid container spacing={1}>
        {values.map((value, index) =>
          <Grid key={index} item>
            <Chip onClick={() => setFilter(value)} color={filter === value ? 'primary' : 'default'} label={value} />
          </Grid>)}
      </Grid>
      <br />
      <Button variant='contained' color='primary' className='button-style' onClick={handleSubmit}>{translation.apply}</Button>
    </div>
  )
}

export default SingleSelectionFilter
