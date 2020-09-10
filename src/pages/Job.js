import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJob } from '../actions'
import { useRouteMatch } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'
import TopBar from '../components/layout/TopBar'
import { Typography, Avatar, Grid, Chip } from '@material-ui/core'
import PageContainer from '../components/layout/PageContainer'
import TitleAndBody from '../components/general/TitleAndBody'
import ChipsSkeleton from '../components/skeletons/ChipsSkeleton'
import UserInfo from '../components/cards/UserInfo'
import PaperContainer from '../components/layout/PaperContainer'
import CustomChip from '../components/cards/CustomChip'
import moment from 'moment'
import UserCard from '../components/cards/UserCard'

const Job = () => {
  const { id } = useRouteMatch().params
  const { job, loading } = useSelector(state => state.jobs)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const timeAgo = () => {
    moment.locale("he");
    return moment(job?.dateCreated).fromNow();
  };

  useEffect(() => { dispatch(getJob(id)) }, [])

  return (
    <>
      <TopBar
        backButton={true}
        title={loading ? <Skeleton height={48} width={240} /> : job.company}
        subtitle={loading ? <Skeleton height={32} width={120} /> : job.location}
      >
        {loading ? (
          <Skeleton variant="circle" className="avatar__md" />
        ) : (
          <Avatar className="avatar__md" src={job?.avatar} alt={job?.company}>
            {job?.company?.charAt(0)}
          </Avatar>
        )}
      </TopBar>
      <PageContainer>
        <CustomChip
          style={{marginBottom: '1rem'}}
          label={loading ? <Skeleton width={80} height={18} /> : timeAgo()}
          size="small"
          variant="outlined"
          color="primary"
        />
        <Typography variant='subtitle1'>{loading ? <Skeleton height={24} width={300} /> : translation.description}</Typography>
        <PaperContainer style={{ marginBottom: "1rem" }}>
          <Typography variant='body1'>{loading ? <Skeleton height={48} width={220} /> : job.description}</Typography>
        </PaperContainer>
        <Typography variant="subtitle1">
          {loading ? <Skeleton height={24} width={220} /> : translation.categories}
        </Typography>
        <PaperContainer style={{ marginBottom: "1rem" }}>
          {loading ? <ChipsSkeleton count={3} />:<Grid container spacing={1}>
              {job?.categories?.map((x, i) => (
                <Grid key={i} item>
                  <CustomChip label={x} />
                </Grid>
              ))}
            </Grid>}
        </PaperContainer>
        <Typography variant='subtitle1'>{loading ? <Skeleton height={24} width={100}/> : translation.contactPerson}</Typography>
        <UserCard loading={loading} containerStyle={{ padding: 0 }} user={{ ...job.user, uid: job.uid }} />
      </PageContainer>
    </>
  );
}

export default Job
