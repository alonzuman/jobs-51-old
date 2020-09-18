import React, { useState, useEffect } from 'react'
import { CardHeader, IconButton, Grid, CardContent, Typography, Avatar, ListItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setJob, saveJob, unsaveJob, openDialog } from '../../actions'
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import moment from 'moment'
import 'moment/locale/he'
import CardContainer from './CardContainer';
import { Link } from 'react-router-dom';
import CustomChip from './CustomChip';

const JobCard = ({ job }) => {
  const { uid, authenticated, savedJobs } = useSelector(state => state.auth)
  const [saved, setSaved] = useState()
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)

  const isSaved = () => savedJobs?.includes(job.id)

  const timeAgo = () => {
    moment.locale('he')
    return moment(job?.dateCreated).fromNow()
  }

  useEffect(() => {
    setSaved(isSaved())
  }, [savedJobs, isSaved])

  const handleClick = () => {
    dispatch(openDialog({ type: 'EditJob', title: 'editJob' }))
    dispatch(setJob(job))
  }

  const favoriteIconStyle = {
    color: '#f02422'
  }

  const handleClickFavorite = () => {
    if (saved) {
      setSaved(false)
      dispatch(unsaveJob(uid, job.id))
    } else {
      setSaved(true)
      dispatch(saveJob(uid, job.id))
    }
  }

  const action = () => {
    if (authenticated && job?.uid === uid) {
      return <IconButton onClick={handleClick}><EditIcon /></IconButton>
    } else {
      if (authenticated) {
        return (
        <IconButton onClick={handleClickFavorite}>
          {saved ? <FavoriteIcon style={favoriteIconStyle} /> : <FavoriteBorderIcon />}
        </IconButton>)
      } else {
        return null
      }
    }
  }

  const chipStyle = {
    direction: 'ltr'
  }

  return (
    <Grid item xs={12} md={6} lg={6}>
      <ListItem className='br-1' button>
        <CardContainer>
          <CardHeader
            avatar={<Avatar src={job?.image} alt={job?.company}>{job?.company[0]?.toUpperCase()}</Avatar>}
            title={job?.company}
            subheader={job?.location}
            action={action()}
          />
          <Link to={`/jobs/${job?.id}`}>
            <CardContent>
              <CustomChip style={chipStyle} label={timeAgo()} size='small' variant='outlined' color='primary'/>
              <Typography variant='subtitle1'>{translation.description}</Typography>
              <Typography variant='body1'>{job?.description}</Typography>
              <Typography variant='subtitle1'>{translation.categories}</Typography>
              <Grid container spacing={1}>
                {job?.categories?.map((req, index) => <Grid item key={index}><CustomChip label={req} /></Grid>)}
              </Grid>
            </CardContent>
          </Link>
        </CardContainer>
      </ListItem>
    </Grid>
  )
}

export default JobCard
