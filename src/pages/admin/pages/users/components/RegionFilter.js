import { Chip, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocations } from '../../../../../actions'
import PageSection from '../../../../../components/atoms/PageSection'
import PageSectionTitle from '../../../../../components/atoms/PageSectionTitle'
import { UsersFilterContext } from './UsersFilterContext'

const RegionFilter = () => {
  const { translation } = useSelector(state => state.theme);
  const { isFetching, isFetched, regions } = useSelector(state => state?.constants?.locations);
  const { queryParams, handleQueryParamsChange } = useContext(UsersFilterContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getLocations())
    }
  }, [])

  if (isFetching) {
    return (
      <PageSection transparent disableGutters>
        <Skeleton height={32} width={64} />
        <Skeleton height={16} width={104} />
      </PageSection>
    )
  } else {
    return (
      <PageSection transparent disableGutters>
        <PageSectionTitle title={translation.filterByRegion} />
        <Grid container spacing={1}>
          {regions.map((region, i) => {
            return (
              <Grid item key={i}>
                <Chip
                  onClick={() => handleQueryParamsChange('region', region)}
                  label={region}
                  color={queryParams.region === region ? 'primary' : 'default'}
                />
              </Grid>
            )
          })}
        </Grid>
      </PageSection>
    )
  }
}

export default RegionFilter
