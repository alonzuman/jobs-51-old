import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../../../../../actions/constants';
import PageSection from '../../../../../v2/atoms/PageSection';
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle';

// Icons
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const AdminStats = () => {
  const { translation } = useSelector(state => state.theme);
  const { region } = useSelector(state => state.auth)
  const { isFetching, isFetched, stats } = useSelector(state => state.constants)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStats())
  }, [])

  if (isFetching && !isFetched) {
    return (
      <PageSection>
        <Skeleton height={24} width={104} />
        <Skeleton height={16} width={104} />
      </PageSection>
    )
  } else if (!isFetching && isFetched) {
    return (
      <PageSection>
        <PageSectionTitle
          title={translation.generalStats}
        />
        <Typography variant='subtitle1'>{translation.region} {region}</Typography>
        <List>
          <ListItem disableGutters>
            <ListItemIcon>
              <CheckCircleOutlineIcon color='primary' className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${stats.approvedActivityHoursByRegionCount[region]} ${translation.approvedActivitiesGeneral}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <CheckCircleOutlineIcon color='primary' className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${stats.approvedUsersByRegion[region]} ${translation.volunteers}`}
            />
          </ListItem>
        </List>
        <Typography variant='subtitle1'>{translation.general}</Typography>
        <List>
          <ListItem disableGutters>
            <ListItemIcon>
              <CheckCircleOutlineIcon color='primary' className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${stats.approvedActivityHoursCount} ${translation.approvedActivitiesGeneral}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <CheckCircleOutlineIcon color='primary' className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${stats.approvedUsersCount} ${translation.volunteers}`}
            />
          </ListItem>
        </List>
        <Divider className='mb-2' />
      </PageSection>
    )
  } else {
    return null;
  }
}

export default AdminStats
