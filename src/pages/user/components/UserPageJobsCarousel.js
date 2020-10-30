import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import JobCard from '../../../components/cards/JobCard'
import useWindowSize from '../../../hooks/useWindowSize'
import PageSection from '../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'

const UserPageJobsCarousel = ({ user, loading }) => {
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
    return null
  } else if (jobs?.length !== 0) {
    return (
      <PageSection>
        <Divider className='mb-2 mt-1' />
        <PageSectionTitle title={`${translation.jobsBy} ${user?.firstName} (${user?.jobs?.length})`} />
        <Swiper spaceBetween={16} slidesPerView={slidesPerView()}>
          {jobs?.map((v, i) => <SwiperSlide key={i}><JobCard job={v} /></SwiperSlide>)}
        </Swiper>
      </PageSection>
    )
  } else {
    return null
  }
}

export default UserPageJobsCarousel
