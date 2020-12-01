import React from 'react'
import PageSection from '../../../components/atoms/PageSection'
import { Skeleton } from '@material-ui/lab'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

// Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { roundNumber } from '../../../utils';
import useWindowSize from '../../../hooks/useWindowSize';

const ActivityPageStats = ({ loading, pending, approved, region }) => {
  const { translation } = useSelector(state => state.theme)
  const { windowWidth } = useWindowSize();

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
      <PageSection className='mb-1' flex={windowWidth > 768} justifyContent='space-between'>
        <PageSection transparent disableGutters>
          {region && <Typography variant='subtitle1'>{translation.totalActivitiesInRegion} {region}</Typography>}
          <List>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckCircleOutlineIcon color='primary' className='medium__icon' />
              </ListItemIcon>
              <ListItemText>
                {roundNumber(approved)} {translation.volHours} {translation.areApproved}
              </ListItemText>
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <HighlightOffIcon className='medium__icon' />
              </ListItemIcon>
              <ListItemText>
                {roundNumber(pending)} {translation.volHours} {translation.pendingApprovalFe}
              </ListItemText>
            </ListItem>
          </List>
        </PageSection>
      </PageSection>
    )
  } else {
    return null;
  }
}

export default ActivityPageStats
