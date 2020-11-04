import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import LocationSelect from '../../../../../v2/molecules/LocationSelect'

const Container = styled.div`
  margin-bottom: 8px;
`

const RegionFilter = ({ selectedRegion, setSelectedRegion, ...rest }) => {
  const { translation } = useSelector(state => state.theme);
  const { isFetching, regions } = useSelector(state => state?.constants);

  return (
    <Container>
      <Typography className='mb-1' variant='h2'>{translation.filterByRegion}</Typography>
      <LocationSelect loading={isFetching} size='small' location={selectedRegion} setLocation={setSelectedRegion} options={regions} />
    </Container>
  )
}

export default RegionFilter
