import { Chip, Divider, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  padding: 8px 16px;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const UserPageJobInfo = ({ editing, loading, user }) => {
  const { translation } = useSelector(state => state.theme)
  const { skills, lastPosition } = user

  if (loading) {
    return (
      <Container>
        <Skeleton width={104} height={18} />
      </Container>
    )
  } else if (lastPosition || skills) {
    return (
      <Container>
        <Typography variant='h2'>{translation.workExperience}</Typography>
        <Typography variant='subtitle1'>{translation.lastPosition}</Typography>
        <InfoContainer>
          <Typography variant='body1'>{lastPosition}</Typography>
        </InfoContainer>
        {skills?.length !== 0 && <Typography variant='subtitle1'>{translation.skillsInterestedIn}</Typography>}
        <InfoContainer>
          <Grid container spacing={1}>
            {skills?.map((v, i) => <Grid item key={i}><Chip label={v} color='primary' variant='outlined' size='small' /></Grid>)}
          </Grid>
        </InfoContainer>
        <br />
        <Divider />
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageJobInfo
