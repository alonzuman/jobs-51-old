import { Button, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StarsIcon from '@material-ui/icons/Stars';
import { checkPermissions } from '../../../utils'

const Container = styled.div`
  padding: 0 16px;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  :last-of-type {
    margin-bottom: 32px;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserPageBadges = ({ loading, editing, user, handleApproveUser, handleIsDeleting, isLookingForJob, setIsLookingForJob, isVolunteer, setIsVolunteer }) => {
  const { translation } = useSelector(state => state.theme)
  const { volunteer, lookingForJob, activities } = user
  const isPending = checkPermissions(user?.role) === 0;
  const hasApprovedActivities = activities?.approved !== 0;

  if (loading) {
    return <Container><Skeleton height={16} width={48} /></Container>
  } else if (editing) {
    return (
      <Container>
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
      </Container>
    )
  } else if (volunteer || lookingForJob || isPending) {
    return (
      <Container>
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
            <StarsIcon className='small__icon ml-5' /><Typography variant='body1'>{activities?.approved} {translation.approvedActivities}</Typography>
          </InfoContainer>}
        {isPending &&
        <ActionsContainer>
          <Button onClick={handleIsDeleting} color='primary' variant='outlined'>{translation.decline}</Button>
          <Button onClick={handleApproveUser} className='mr-5' color='primary' variant='contained'>{translation.approve}</Button>
        </ActionsContainer>}
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageBadges
