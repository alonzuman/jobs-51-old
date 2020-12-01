import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import JobCard from '../molecules/JobCard'
import useWindowSize from '../../hooks/useWindowSize'

const JobsCarousel = ({ jobs }) => {
  const { slidesPerView } = useWindowSize()
  return (
    <Swiper spaceBetween={16} slidesPerView={slidesPerView}>
      {jobs?.map((v, i) => <SwiperSlide key={i}><JobCard job={v} /></SwiperSlide>)}
    </Swiper>
  )
}

export default JobsCarousel
