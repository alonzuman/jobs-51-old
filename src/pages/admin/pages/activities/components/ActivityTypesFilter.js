import { Chip, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityTypes } from '../../../../../actions'
import PageSection from '../../../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle'
import { ActivitiesFilterContext } from './ActivitiesFilterContext'

const ActivityTypesFilter = () => {
  const { all, isFetching, isFetched } = useSelector(state => state.constants.activityTypes)
  const { translation } = useSelector(state => state.theme)
  const { queryParams, handleQueryParamsChange } = useContext(ActivitiesFilterContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getActivityTypes())
    }
  }, [])

  if (isFetching) {
    return (
      <PageSection disableGutters transparent>
        <Skeleton height={32} width={104} />
      </PageSection>)
  } else {
    return (
      <PageSection disableGutters transparent>
        <PageSectionTitle title={translation.activityType} />
        <Grid container spacing={1}>
          {all?.map((value, i) => {
            return (
              <Grid key={i} item>
                <Chip
                  onClick={() => handleQueryParamsChange('type', value)}
                  color={queryParams.type === value ? 'primary' : 'default'}
                  label={value}
                />
              </Grid>
            )
          })}
        </Grid>
      </PageSection>
    )
  }
}

export default ActivityTypesFilter
