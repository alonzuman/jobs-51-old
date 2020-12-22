import { Button } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import EmptyStateArt from '../../assets/art/EmptyStateArt';
import useTheme from '../../hooks/useTheme'
import EmptyStateContainer from '../atoms/EmptyStateContainer'

const SavedEmptyState = () => {
  const { translation } = useTheme();

  const renderAction = (
    <Link to='/jobs'>
      <Button size='large' variant='contained' color='primary'>
        {translation?.allJobs}
      </Button>
    </Link>
  )

  return (
    <EmptyStateContainer
      art={EmptyStateArt}
      title={translation?.jobsEmptyStateTitle}
      subtitle={translation?.jobsEmptyStateSubtitle}
      action={renderAction}
    />
  )
}

export default SavedEmptyState
