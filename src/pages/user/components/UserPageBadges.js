import { Button, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StarsIcon from '@material-ui/icons/Stars';
import { checkPermissions } from '../../../utils'
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoContainer from './InfoContainer'
import PageSection from '../../../v2/atoms/PageSection'

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserPageBadges = ({ loading, editing, user, handleApproveUser, handleIsDeclining, isLookingForJob, setIsLookingForJob, isVolunteer, setIsVolunteer }) => {
  const { translation } = useSelector(state => state.theme)
  const { volunteer, lookingForJob, activities } = user
  const isPending = checkPermissions(user?.role) === 0;
  const hasApprovedActivities = activities?.approved !== 0;
  const hasPostedJobs = user?.jobs?.length !== 0;

  if (loading) {
    return (
      <PageSection>
        <Skeleton height={16} width={48} />
        <br />
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox color='primary' name='lookingForJob' onChange={e => setIsLookingForJob(!isLookingForJob)} checked={isLookingForJob} />}
            label={translation.lookingForJob}
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox color='primary' name='lookingForJob' onChange={e => setIsVolunteer(!isVolunteer)} checked={isVolunteer} />}
            label={translation.volunteer}
          />
        </FormGroup>
        <br />
      </PageSection>
    )
  } else if (volunteer || lookingForJob || isPending) {
    return (
      <PageSection>
        <Grid className='mb-5' container spacing={1}>
          {isPending &&
            <Grid item>
              <Chip color='primary' variant='outlined' label={translation.pendingApproval} className='fit__content' size='small' />
            </Grid>}
          {lookingForJob &&
            <Grid item>
              <Chip color='primary' variant='outlined' label={translation.iAmLookingForAJob} className='fit__content' size='small' />
            </Grid>}
          {volunteer &&
            <Grid item>
              <Chip color='primary' variant='outlined' label={translation.activeVolunteer} size='small' className='fit__content' />
            </Grid>}
        </Grid>
        {hasApprovedActivities &&
          <InfoContainer>
            <StarsIcon className='small__icon ml-5' />
            <Typography variant='body1'>
              {activities?.approved} {translation.approvedActivities}
            </Typography>
          </InfoContainer>}
        {hasPostedJobs &&
          <InfoContainer>
            <AssignmentIcon className='small__icon ml-5' />
            <Typography variant='body1'>
              {translation.posted} {user?.jobs?.length} {translation.jobOffer}
            </Typography>
          </InfoContainer>}
        {isPending &&
        <ActionsContainer>
          <Button onClick={handleIsDeclining} color='primary' variant='outlined'>{translation.decline}</Button>
          <Button onClick={handleApproveUser} className='mr-5' color='primary' variant='contained'>{translation.approve}</Button>
        </ActionsContainer>}
      </PageSection>
    )
  } else {
    return null
  }
}

export default UserPageBadges
