import { Chip, Divider, Grid, TextField, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import SkillsSelect from '../../../components/forms/profile/SkillsSelect'

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

const UserPageJobInfo = ({ editing, loading, lastPosition, setLastPosition, skills, setSkills }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <Container>
        <Skeleton width={104} height={18} />
      </Container>
    )
  } else if (editing) {
    return (
      <Container>
        <Divider />
        <br />
        <Typography variant='h2'>{translation.workExperience}</Typography>
        <br />
        <InfoContainer>
          <TextField className='fit__content' size='small' label={translation.lastPosition} variant='outlined' value={lastPosition} onChange={e => setLastPosition(e.target.value)} />
        </InfoContainer>
        <InfoContainer>
          <SkillsSelect skills={skills} setSkills={setSkills} />
        </InfoContainer>
      </Container>
    )
  } else if (lastPosition || skills) {
    return (
      <Container>
        <Divider />
        <br />
        <Typography variant='h2'>{translation.workExperience}</Typography>
        <Typography variant='subtitle1'>{translation.lastPosition}</Typography>
        <InfoContainer>
          <Typography variant='body1'>{lastPosition}</Typography>
        </InfoContainer>
        {skills?.length !== 0 && <Typography className='mb-5' variant='subtitle1'>{translation.skillsInterestedIn}</Typography>}
        <InfoContainer>
          <Grid container spacing={1}>
            {skills?.map((v, i) => <Grid item key={i}><Chip label={v} color='primary' variant='outlined' size='small' /></Grid>)}
          </Grid>
        </InfoContainer>
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageJobInfo
