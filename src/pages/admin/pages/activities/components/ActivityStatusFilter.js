import { Chip, Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle'
import { ActivitiesFilterContext } from './ActivitiesFilterContext'

const statuses = ['approved', 'pending', 'all']

const ActivityStatusFilter = () => {
  const { translation } = useSelector(state => state.theme)
  const { queryParams, handleQueryParamsChange } = useContext(ActivitiesFilterContext)

  return (
    <PageSection disableGutters transparent>
      <PageSectionTitle title={translation.status} />
      <Grid container spacing={1}>
        {statuses?.map((value, i) => {
          return (
            <Grid key={i} item>
              <Chip
                onClick={() => handleQueryParamsChange('status', value)}
                color={queryParams.status === value ? 'primary' : 'default'}
                label={translation[value]}
              />
            </Grid>
          )
        })}
      </Grid>
    </PageSection>
  )
}

export default ActivityStatusFilter
