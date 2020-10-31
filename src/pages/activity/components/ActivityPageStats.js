import React from 'react'
import PageSection from '../../../v2/atoms/PageSection'
import { Skeleton } from '@material-ui/lab'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

// Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const ActivityPageStats = ({ loading, pending, approved, region }) => {
  const { translation, theme } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection>
        <Skeleton className='mt-1' variant='text' height={32} width={64} />
        <Skeleton variant='text' className='mb-1' width={124} height={16} />
        <Skeleton variant='text' className='mb-1' width={80} height={24} />
        <Skeleton variant='text' className='mb-1' width={96} height={24} />
      </PageSection>
    )
  } else if (region) {
    return (
      <PageSection>
        {region && <Typography variant='subtitle1'>{translation.totalActivitiesInRegion} {region}</Typography>}
        <List>
          <ListItem disableGutters>
            <ListItemIcon>
              <CheckCircleOutlineIcon color='primary' className='medium__icon' />
            </ListItemIcon>
            <ListItemText>
              {approved === 0 ? 0 : approved.toFixed(1)} {translation.volHours} {translation.areApproved}
            </ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <HighlightOffIcon className='medium__icon' />
            </ListItemIcon>
            <ListItemText>
              {pending === 0 ? 0 : pending.toFixed(1)} {translation.volHours} {translation.pendingApprovalFe}
            </ListItemText>
          </ListItem>
        </List>
      </PageSection>
    )
  } else {
    return null;
  }
}

export default ActivityPageStats
