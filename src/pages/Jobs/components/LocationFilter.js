import { Chip, Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import { JobsFilterContext } from '../../../contexts/JobsFilterContext'
import useJobsConstants from '../../../hooks/useJobsConstants'
import useTheme from '../../../hooks/useTheme'
import PageSection from '../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'

const LocationFilter = () => {
  const { translation } = useTheme();
  const { listedLocations } = useJobsConstants();
  const { query, handleJobsQueryChange } = useContext(JobsFilterContext);

  const handleClick = location => {
    handleJobsQueryChange('location', location);
  }

  return (
    <PageSection transparent disableGutters>
      <PageSectionTitle title={translation.filterByLocation} />
      <Grid container spacing={1}>
        {Object.keys(listedLocations)?.map(location => {
          if (listedLocations[location] > 0) {
            return (
              <Grid item key={location}>
                <Chip label={location} onClick={() => handleClick(location)} color={query.location === location ? 'primary' : 'default'} />
              </Grid>
            )
          }
        })}
      </Grid>
    </PageSection>
  )
}

export default LocationFilter
