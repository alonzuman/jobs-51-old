import { Box, Button, useMediaQuery } from '@material-ui/core';
import React from 'react'
import { Redirect } from 'react-router-dom';
import PageSection from '../../../components/atoms/PageSection';
import useTheme from '../../../hooks/useTheme';

const JobPageCallToAction = ({ job, loading }) => {
  const matches = useMediaQuery('(max-width: 768px)');
  const { theme, translation } = useTheme();

  const handleClick = () => {
    // 1. If current user havent completed profile -> go update profile
    // 2. If profile completed and job has only email -> send new email
    // 3. If profile completed + only address ()
    if (job?.email) return window.open(`mailto:${job?.email}`);
    if (job?.phone) return window.open(`tel:+972${job.phone}`)
  }

  if (loading) return null;

  if (matches) {
    return (
      <Box className='job__CTA' position='fixed' padding={2} bottom={0} zIndex={99} right={0} left={0} bgcolor={theme.palette.background.light}>
        <Button onClick={handleClick} fullWidth size='large' variant='contained' color='primary'>
          {translation.jobPageCTA}
        </Button>
      </Box>
    )
  }

  return (
    <PageSection>
      <Box marginBottom={2}>
        <Button onClick={handleClick} variant='contained' color='primary' size='large'>
          {translation.jobPageCTA}
        </Button>
      </Box>
    </PageSection>
  )
}

export default JobPageCallToAction
