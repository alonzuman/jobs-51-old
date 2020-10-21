import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import JobCard from '../../../components/cards/JobCard'
import useWindowSize from '../../../hooks/useWindowSize'

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  margin-bottom: 96px;
`

const UserPageJobsCarousel = ({ user, loading, editing }) => {
  const { translation } = useSelector(state => state.theme)
  const { jobs } = user
  const { windowWidth } = useWindowSize()

  const slidesPerView = () => {
    if (windowWidth <= 768) {
      return 1.1
    } else {
      return 2
    }
  }

  if (loading) {
    return <Container className='p-1'><Skeleton width={128} height={32} /></Container>
  } else if (editing) {
    return null
  } else if (jobs?.length !== 0) {
    return (
      <Container>
        <Divider className='mr-1 ml-1' />
        <Typography className='mr-1' variant='h2'>{translation.jobsBy} {user?.firstName} ({user?.jobs?.length})</Typography>
        <Swiper spaceBetween={16} slidesPerView={slidesPerView()}>
          {jobs?.map((v, i) => <SwiperSlide key={i}><JobCard job={v} /></SwiperSlide>)}
        </Swiper>
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageJobsCarousel
