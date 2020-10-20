import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 8px;
`

const IndustryFilter = () => {
  const { translation } = useSelector(state => state.theme)
  const industries = useSelector(state => state?.constants?.industries?.all)

  return (
    <Container>
      <Typography variant='h3'>{translation.filterByIndustry}</Typography>
      <Typography variant='subtitle1'>{translation.industryName}</Typography>
      <FormControl>
        <Select variant='outlined'>
          {industries?.map((v, i) => <MenuItem className='rtl text__right' key={i} value={v}>{v}</MenuItem>)}
        </Select>
      </FormControl>
    </Container>
  )
}

export default IndustryFilter
