import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../../../../../actions/constants';
import PageSection from '../../../../../v2/atoms/PageSection';
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle';

// Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { roundNumber } from '../../../../../utils';

const AdminStats = () => {
  const { translation } = useSelector(state => state.theme);
  const { region } = useSelector(state => state.auth)
  const { isFetching, isFetched, all } = useSelector(state => state.constants.stats)
  const { volunteersByRegionCount, approvedActivityHoursCount, approvedActivityHoursByRegionCount, pendingUsersCount, volunteersCount } = all;
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getStats())
    }
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
      <PageSection disableGutters>
        <Typography variant='subtitle1'>{translation.region} {region}</Typography>
        <List>
          <ListItem disableGutters>
            <ListItemIcon>
              <AccessTimeIcon className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${roundNumber(approvedActivityHoursByRegionCount[region])} ${translation.approvedActivitiesGeneral}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <AccessibilityNewIcon className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${volunteersByRegionCount[region]} ${translation.volunteers}`}
            />
          </ListItem>
        </List>

        <Typography variant='subtitle1'>{translation.allRegions}</Typography>
        <List>
          <ListItem disableGutters>
            <ListItemIcon>
              <AccessTimeIcon className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${roundNumber(approvedActivityHoursCount)} ${translation.approvedActivitiesGeneral}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <AccessibilityNewIcon className='medium__icon' />
            </ListItemIcon>
            <ListItemText
              primary={`${volunteersCount} ${translation.volunteers}`}
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
