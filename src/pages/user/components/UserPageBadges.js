import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StarsIcon from '@material-ui/icons/Stars';
import { checkPermissions, roles } from '../../../utils'
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoContainer from './InfoContainer'
import PageSection from '../../../v2/atoms/PageSection'
import LocationSelect from '../../../components/forms/profile/LocationSelect'
import EditUserActivities from './EditUserActivities'

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
  stateRole,
  stateApproved,
  setApproved,
  statePending,
  setPending,
  setRole
}) => {
  const { role } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const { volunteer, lookingForJob, activities, role: userRole } = user
  const isPending = checkPermissions(user?.role) === 0;
  const hasApprovedActivities = activities?.approved !== 0;
  const hasPostedJobs = user?.jobs?.length !== 0;
  const { regions } = useSelector(state => state.constants?.locations)
  const isAdmin = checkPermissions(role) >= 3
  const isAdminOrManagerOrModerator = checkPermissions(userRole) >= 2


  if (loading) {
    return (
      <PageSection>
        <Skeleton className='mb-1' height={16} width={48} />
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
        {isAdmin &&
          <>
            <Typography variant='subtitle1'>{translation.role}</Typography>
            <FormControl size='small' className='mb-1 mxw-196'>
              <Select variant='outlined' value={stateRole} onChange={e => setRole(e.target.value)}>
                {roles?.map((v, i) => {
                  if (checkPermissions(role) < 4 && v !== 'admin') {
                    return <MenuItem dir='rtl' key={i} value={v}>{translation.roles[v]}</MenuItem>
                  } else if (checkPermissions(role) === 4 && v === 'admin') {
                    return <MenuItem dir='rtl' key={i} value={v}>{translation.roles[v]}</MenuItem>
                  } else {
                    return <MenuItem dir='rtl' key={i} value={v}>{translation.roles[v]}</MenuItem>
                  }
                }
                )}
              </Select>
            </FormControl>
          </>}
        <EditUserActivities
          stateRegion={stateRegion}
          setRegion={setRegion}
          regions={regions}
          stateApproved={stateApproved}
          setApproved={setApproved}
          statePending={statePending}
          setPending={setPending}
          isVolunteer={isVolunteer}
          isAdmin={isAdmin}
        />
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
          {isAdminOrManagerOrModerator &&
            <Grid item>
              <Chip color='primary' variant='outlined' label={translation.roles.manager} size='small' className='fit__content' />
            </Grid>}
        </Grid>
        <List>
          {hasApprovedActivities &&
            <ListItem disableGutters>
              <ListItemIcon>
                <StarsIcon className='small__icon' />
              </ListItemIcon>
              <ListItemText>
                {activities?.approved} {translation.approvedActivities}
              </ListItemText>
            </ListItem>}
          {hasPostedJobs &&
            <ListItem disableGutters>
              <ListItemIcon>
                <AssignmentIcon className='small__icon' />
              </ListItemIcon>
              <ListItemText>
                {user?.jobs?.length} {translation.jobsPostedBy}  {user?.firstName}
              </ListItemText>
            </ListItem>}
          {isPending && isAdmin &&
            <ActionsContainer>
              <Button onClick={handleIsDeclining} color='primary' variant='outlined'>{translation.decline}</Button>
              <Button onClick={handleApproveUser} className='mr-5' color='primary' variant='contained'>{translation.approve}</Button>
            </ActionsContainer>}
        </List>
      </PageSection>
    )
  } else {
    return null
  }
}

export default UserPageBadges
