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
import LocationSelect from '../../../components/forms/profile/LocationSelect'

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const UserPageBadges = ({
  loading,
  editing,
  user,
  handleApproveUser,
  handleIsDeclining,
  isLookingForJob,
  setIsLookingForJob,
  isVolunteer,
  setIsVolunteer,
  stateRegion,
  setRegion,
}) => {
  const { role } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const { volunteer, lookingForJob, activities } = user
  const isPending = checkPermissions(user?.role) === 0;
  const hasApprovedActivities = activities?.approved !== 0;
  const hasPostedJobs = user?.jobs?.length !== 0;
  const { regions } = useSelector(state => state.constants?.locations)
  const isAdmin = checkPermissions(role) >= 3

  const locationHelperText = () => {
    if (isAdmin) {
      return ''
    } else if (!isAdmin && stateRegion === '') {
      return translation.afterSetOnlyAdminCanChange
    } else if (!isAdmin && stateRegion !== '') {
      return translation.onlyAdminCanChange
    }
  }

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
        <FormGroup row className='mb-5'>
          <FormControlLabel
            control={<Checkbox color='primary' name='lookingForJob' onChange={e => setIsVolunteer(!isVolunteer)} checked={isVolunteer} />}
            label={translation.volunteerInUnitsProgram}
          />
        </FormGroup>
        {isVolunteer &&
          <LocationSelect
            helperText={locationHelperText()}
            disabled={!isAdmin && stateRegion}
            label={translation.activityRegion}
            size='small'
            location={stateRegion}
            setLocation={setRegion}
            className='mxw-224 mb-1'
            options={regions}
          />}
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
              {user?.jobs?.length} {translation.jobsPostedBy}  {user?.firstName}
            </Typography>
          </InfoContainer>}
        {isPending && isAdmin &&
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
