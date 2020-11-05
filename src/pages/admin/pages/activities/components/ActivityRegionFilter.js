import { Chip, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocations } from '../../../../../actions'
import PageSection from '../../../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle'
import { ActivitiesFilterContext } from './ActivitiesFilterContext'

const ActivityRegionFilter = () => {
  const { isFetching, isFetched, regions } = useSelector(state => state.constants.locations)
  const { translation } = useSelector(state => state.theme)
  const { queryParams, handleQueryParamsChange } = useContext(ActivitiesFilterContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getLocations())
    }
  }, [])

  if (isFetching) {
    return (
      <PageSection transparent disableGutters>
        <Skeleton height={16} width={64} />
        <Skeleton height={32} width={104} />
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
                  color={queryParams.region === region ? 'primary' : 'default'}
                  label={region}
                />
              </Grid>
            )
          })}
        </Grid>
      </PageSection>
    )
  }
}

export default ActivityRegionFilter
