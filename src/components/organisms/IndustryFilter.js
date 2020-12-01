import { Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 8px;
`

const IndustryFilter = ({ selectedIndustry, setSelectedIndustry }) => {
  const { translation } = useSelector(state => state.theme)
  const industries = useSelector(state => state?.constants?.industries?.all)
  const options = [translation.all, ...industries]

  const handleSelection = e => {
    setSelectedIndustry(e.target.value)
  }

  return (
    <Container>
      <Typography variant='h2'>{translation.filterByIndustry}</Typography>
      <Typography variant='subtitle1'>{translation.industryName}</Typography>
      <FormControl>
        <Select value={selectedIndustry} onChange={handleSelection} variant='outlined'>
          {options?.map((v, i) => <MenuItem className='rtl text__right' key={i} value={v}>{v}</MenuItem>)}
        </Select>
      </FormControl>
      <Divider className='mt-2' />
    </Container>
  )
}

export default IndustryFilter
