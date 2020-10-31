import { Chip, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import SkillsSelect from '../../../v2/molecules/SkillsSelect'
import WorkIcon from '@material-ui/icons/Work';
import InfoContainer from './InfoContainer'
import GradeIcon from '@material-ui/icons/Grade';
import PageSection from '../../../v2/atoms/PageSection'
import useWindowSize from '../../../hooks/useWindowSize'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'

const UserPageJobInfo = ({ user, editing, loading, lastPosition, setLastPosition, skills, setSkills }) => {
  const { translation } = useSelector(state => state.theme)
  const { windowWidth } = useWindowSize()


  if (loading) {
    return (
      <PageSection>
        <Skeleton width={104} height={18} />
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection spaceBottom={windowWidth < 768}>
        <Divider className='mb-2 mt-1' />
        <PageSectionTitle title={translation.workExperience} />
        <List>
          <ListItem disableGutters>
            <ListItemIcon>
              <WorkIcon className='small__icon' />
            </ListItemIcon>
            <TextField className='fit__content' size='small' label={translation.lastPosition} variant='outlined' value={lastPosition} onChange={e => setLastPosition(e.target.value)} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <GradeIcon className='small__icon' />
            </ListItemIcon>
            <SkillsSelect skills={skills} setSkills={setSkills} className='mw-224' size='small' />
          </ListItem>
        </List>
      </PageSection>
    )
  } else if (user?.lastPosition && user?.skills?.length !== 0) {
    return (
      <PageSection>
        <Divider className='mb-2 mt-1' />
        <PageSectionTitle title={translation.workExperience} />
        <List>
          {user?.lastPosition &&
            <>
              <Typography variant='subtitle1'>{translation.lastPosition}</Typography>
              <ListItem className='mt-0' disableGutters>
                <ListItemIcon>
                  <WorkIcon className='small__icon' />
                </ListItemIcon>
                <ListItemText>
                  {user?.lastPosition}
                </ListItemText>
              </ListItem>
            </>}
          {user?.skills?.length !== 0 &&
            <>
              <Typography variant='subtitle1'>{translation.skillsInterestedIn}</Typography>
              <ListItem disableGutters>
                <Grid container spacing={1}>
                  {user?.skills?.map((v, i) => <Grid item key={i}><Chip label={v} color='primary' variant='outlined' size='small' /></Grid>)}
                </Grid>
              </ListItem>
            </>}
        </List>
      </PageSection>
    )
  } else {
    return null
  }
}

export default UserPageJobInfo
