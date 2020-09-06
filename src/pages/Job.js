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

const Job = () => {
  const { id } = useRouteMatch().params
  const { job, loading } = useSelector(state => state.jobs)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getJob(id)) }, [])

  // console.log(job)
  return (
    <>
      <TopBar
        backButton={true}
        title={loading ? <Skeleton height={48} width={240} /> : job.company }
        subtitle={loading ? <Skeleton height={32} width={120} /> : job.location }
      >
        {loading ? <Skeleton variant='circle' className='avatar__md' /> : <Avatar className='avatar__md' src={job?.avatar} alt={job?.company}>{job?.company?.charAt(0)}</Avatar>}
      </TopBar>
      <PageContainer>
        <TitleAndBody
          title={loading ? <Skeleton height={32} width={300} /> : translation.description}
          body={loading ? <Skeleton height={48} width={220} /> : job.description}
        />
        <Typography variant='subtitle1'>{loading ? <Skeleton height={48} width={220} /> : translation.categories}</Typography>
        {loading ? <ChipsSkeleton count={3} /> : <Grid container spacing={1}>{job?.categories?.map((x, i) => <Grid key={i} item><Chip label={x} /></Grid>)}</Grid>}
        <Typography variant='subtitle1'>{translation.contactPerson}</Typography>
        <UserInfo user={job.user} />
      </PageContainer>
    </>
  )
}

export default Job
