import React, { useState, useEffect } from 'react'
import { Grid, Chip, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalFilters, closeDialogs, getFilters } from '../../actions'
import ChipsSkeleton from '../layout/ChipsSkeleton'

const SingleSelectionFilter = ({ type }) => {
  const { translation } = useSelector(state => state.theme)
  const { filters } = useSelector(state => state.jobs)
  const [selections, setSelections] = useState([])
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()

  const fetch = async () => {
    const res = await dispatch(getFilters(type))
    setSelections(res)
    if (Object.keys(filters).length > 0) {
      setFilter(filters[type])
    }
  }

  useEffect(() => { fetch() }, [])

  const handleSubmit = () => {
    dispatch(setGlobalFilters({ [type]: filter}))
    dispatch(closeDialogs())
  }

  return (
    <div>
      <Grid container spacing={1}>
        {selections.length === 0 && <ChipsSkeleton />}
        {selections.length > 0 && selections.map((value, index) =>
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
