import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 8px;
`

const DateFilter = ({ selectedMinDate, setSelectedMinDate }) => {
  const { translation } = useSelector(state => state.theme)

  return (
    <Container>
      <Typography variant='h3'>{translation.filterByMinDate}</Typography>
      <Typography variant='subtitle1'>{translation.filterByMinDateSubheader}</Typography>
    </Container>
  )
}

export default DateFilter
