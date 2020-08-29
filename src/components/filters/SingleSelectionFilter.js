import React, { useState, useEffect } from 'react'
import { Grid, Chip, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalFilters, closeDialogs, getFilters } from '../../actions'
import ChipsSkeleton from '../skeletons/ChipsSkeleton'
import { dateFilters } from '../../utils'

const SingleSelectionFilter = ({ type }) => {
  const { translation } = useSelector(state => state.theme)
  const { filters } = useSelector(state => state.jobs)
  const [selections, setSelections] = useState([])
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch()

  const fetch = async () => {
    if (type === 'dates') {
      setSelections([...dateFilters()])
    } else {
      const res = await dispatch(getFilters(type))
      setSelections({...res})
      if (filters && Object.keys(filters).length > 0) {
        setFilter(filters[type])
      }
    }
  }

  useEffect(() => { fetch() }, [])

  const handleSubmit = () => {
    dispatch(setGlobalFilters({ [type]: filter}))
    dispatch(closeDialogs())
  }

  return (
    <div>
      {Object.keys(selections).length === 0 && <ChipsSkeleton />}
      <Grid container spacing={1}>
        {Object.keys(selections).length > 0 && Object.keys(selections).map((value, index) => {
          if (Object.values(selections)[index] !== 0) {
            return (
              <Grid key={index} item>
                {type !== 'dates' && <Chip onClick={() => setFilter(value)} color={filter === value ? 'primary' : 'default'} label={Object.keys(selections)[index]} />}
                {type === 'dates' && <Chip onClick={() => setFilter(selections[index].value)} color={filter === selections[index].value ? 'primary' : 'default'} label={selections[index].label} />}
              </Grid>)
              }}
            )}
      </Grid>
      <br />
      <Button disabled={filter?.length === 0} variant='contained' color='primary' className='button-style' onClick={handleSubmit}>{translation.apply}</Button>
    </div>
  )
}

export default SingleSelectionFilter
