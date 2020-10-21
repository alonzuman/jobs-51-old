import { Chip, Divider, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StarsIcon from '@material-ui/icons/Stars';

const Container = styled.div`
  padding: 8px 16px;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserPageBadges = ({ loading, editing, user }) => {
  const { translation } = useSelector(state => state.theme)
  const { volunteer, lookingForJob, activities } = user

  if (loading) {
    return <Container><Skeleton height={16} width={48} /></Container>
  } else if (volunteer || lookingForJob) {
    return (
      <Container>
        <Grid container spacing={1}>
          {lookingForJob &&
            <Grid item>
              <Chip color='primary' variant='outlined' label={translation.iAmLookingForAJob} className='fit__content' size='small' />
            </Grid>}
          {volunteer &&
            <Grid item>
              <Chip color='primary' variant='outlined' label={translation.activeVolunteer} size='small' className='fit__content' />
            </Grid>}
        </Grid>
        <br />
        {activities?.approved !== 0 &&
          <InfoContainer>
            <StarsIcon className='small__icon ml-5' /><Typography variant='body1'>{activities?.approved} {translation.approvedActivities}</Typography>
          </InfoContainer>}
        <br />
        <Divider />
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageBadges
