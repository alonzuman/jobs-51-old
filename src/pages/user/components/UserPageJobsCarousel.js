import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import JobCard from '../../../components/molecules/JobCard'
import useWindowSize from '../../../hooks/useWindowSize'
import PageSection from '../../../components/atoms/PageSection'
import PageSectionTitle from '../../../components/atoms/PageSectionTitle'

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
        <PageSectionTitle title={`${translation.jobsBy} ${user?.firstName} (${user?.jobs?.length})`} />
        <Swiper spaceBetween={16} slidesPerView={slidesPerView()}>
          {jobs?.map((v, i) => <SwiperSlide key={i}><JobCard showBorder={false} job={v} /></SwiperSlide>)}
        </Swiper>
        <Divider className='mt-1' />
      </PageSection>
    )
  } else {
    return null
  }
}

export default UserPageJobsCarousel
