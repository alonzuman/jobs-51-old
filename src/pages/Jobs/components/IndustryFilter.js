import { Chip, Grid } from '@material-ui/core';
import React, { useContext } from 'react'
import { JobsFilterContext } from '../../../contexts/JobsFilterContext';
import useJobsConstants from '../../../hooks/useJobsConstants'
import useTheme from '../../../hooks/useTheme';
import PageSection from '../../../v2/atoms/PageSection';
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle';

const IndustryFilter = () => {
  const { translation } = useTheme();
  const { industries } = useJobsConstants();
  const { query, handleJobsQueryChange } = useContext(JobsFilterContext);

  const handleClick = industry => {
    handleJobsQueryChange('industry', industry)
  }

  return (
    <PageSection transparent disableGutters>
      <PageSectionTitle title={translation.filterByIndustry} />
      <Grid container spacing={1}>
        {industries?.map(industry => (
          <Grid item key={industry}>
            <Chip color={query.industry === industry ? 'primary' : 'default'} label={industry} onClick={() => handleClick(industry)} />
          </Grid>
        ))}
      </Grid>
    </PageSection>
  )
}

export default IndustryFilter
