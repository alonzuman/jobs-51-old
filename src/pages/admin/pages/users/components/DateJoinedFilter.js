import { Chip, Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../../../components/atoms/PageSection'
import PageSectionTitle from '../../../../../components/atoms/PageSectionTitle'
import { UsersFilterContext } from './UsersFilterContext'

const DateJoinedFilter = () => {
  const { translation } = useSelector(state => state.theme);
  const { queryParams, handleQueryParamsChange } = useContext(UsersFilterContext);

  const today = new Date();
  const splittedToday = today.toString().split(' ')
  const todayInMiliseconds = new Date(`${splittedToday[0]} ${splittedToday[1]} ${splittedToday[2]} ${splittedToday[3]}`).getTime();
  const day = 86400000;
  const week = 7 * day;
  const month = 30 * day;

  const options = {
    pastDay: todayInMiliseconds - day,
    pastWeek: todayInMiliseconds - week,
    pastMonth: todayInMiliseconds - month,
  }

  return (
    <PageSection transparent disableGutters>
      <PageSectionTitle title={translation.filterByDateJoined} />
      <Grid spacing={1} container>
        {Object.keys(options).map(date => (
          <Grid key={date} item>
            <Chip
              label={translation.times[date]}
              onClick={() => handleQueryParamsChange('dateCreated', options[date])}
              color={parseInt(queryParams.dateCreated) === options[date] ? 'primary' : 'default'}
            />
          </Grid>
        ))}
      </Grid>
    </PageSection>
  )
}

export default DateJoinedFilter
