import { Button, Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import ActivityCard from '../../../components/cards/ActivityCard'
import useWindowSize from '../../../hooks/useWindowSize'

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  margin-bottom: 16px;

  :last-of-type: {
    margin-bottom: 96px;
  }
`

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
`

const SectionHeaderRight = styled.div``

const SectionHeaderLeft = styled.div``

const UserPageActivitiesCarousel = ({ user, loading }) => {
  const { translation } = useSelector(state => state.theme)
  const { activitiesList } = user
  const { slidesPerView } = useWindowSize()

  if (loading) {
    return (
      <Container className='p-1'>
        <Skeleton width={128} height={32} />
      </Container>
    )
  } else if (activitiesList?.length !== 0) {
    return (
      <Container>
        <Divider className='mr-1 mb-1 ml-1' />
        <SectionHeader>
          <SectionHeaderRight>
            <Typography className='mr-1' variant='h2'>{translation.activitiesBy} {user?.firstName} ({activitiesList?.length})</Typography>
            <Typography className='mr-1' variant='subtitle1'>{translation.activitiesByExplanation}</Typography>
          </SectionHeaderRight>
          <SectionHeaderLeft>
            <Link to={`${user?.uid}/activities`}>
              <Button className='pt-25 pb-25 pl-25 pr-25' color='primary'>{translation.showAll}</Button>
            </Link>
          </SectionHeaderLeft>
        </SectionHeader>
        <Swiper spaceBetween={16} slidesPerView={slidesPerView}>
          {activitiesList?.map((v, i) => <SwiperSlide key={i}><ActivityCard showUser={false} activity={v} /></SwiperSlide>)}
        </Swiper>
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageActivitiesCarousel
