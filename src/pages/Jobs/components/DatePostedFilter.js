import React, { useContext } from 'react'
import { JobsFilterContext } from '../../../contexts/JobsFilterContext'
import useTheme from '../../../hooks/useTheme'
import PageSection from '../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'
import { DAY, WEEK, MONTH } from '../../../utils/index';
import { Chip, Grid } from '@material-ui/core'

const DatePostedFilter = () => {
  const { translation } = useTheme();
  const { query, handleJobsQueryChange } = useContext(JobsFilterContext);

  const today = new Date();
  const splittedToday = today.toString().split(' ')
  const todayInMiliseconds = new Date(`${splittedToday[0]} ${splittedToday[1]} ${splittedToday[2]} ${splittedToday[3]}`).getTime();

  const timePeriods = {
    pastDay: todayInMiliseconds - DAY,
    pastWeek: todayInMiliseconds - WEEK,
    pastMonth: todayInMiliseconds - MONTH,
  }

  const handleClick = dateCreated => {
    handleJobsQueryChange('dateCreated', dateCreated)
  }

  return (
    <PageSection transparent disableGutters>
      <PageSectionTitle title={translation.filterByDatePosted} />
      <Grid container spacing={1}>
        {Object.keys(timePeriods).map(time => (
          <Grid key={time} item>
            <Chip
              label={translation.times[time]}
              onClick={() => handleClick(timePeriods[time])}
              color={parseInt(query.dateCreated) === timePeriods[time] ? 'primary' : 'default'}
            />
          </Grid>
        ))}
      </Grid>
    </PageSection>
  )
}

export default DatePostedFilter
