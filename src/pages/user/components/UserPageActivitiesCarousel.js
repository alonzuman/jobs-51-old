import { Button, Divider } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import ActivityCard from '../../../components/cards/ActivityCard'
import useWindowSize from '../../../hooks/useWindowSize'
import PageSection from '../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'

const UserPageActivitiesCarousel = ({ user, loading }) => {
  const { translation } = useSelector(state => state.theme)
  const { activitiesList } = user
  const { slidesPerView } = useWindowSize()

  if (loading) {
    return (
      <PageSection className='p-1'>
        <Skeleton width={128} height={32} />
      </PageSection>
    )
  } else if (activitiesList?.length !== 0) {
    return (
      <PageSection className='overflow__hidden full__width mb-1'>
        <Divider className='mb-2 mt-1' />
        <PageSectionTitle
          title={`${translation.activitiesBy} ${user?.firstName}`}
          subtitle={translation.activitiesByExplanation}
          action={
            <Link className='p-0' to={`${user?.uid}/activities`}>
              <Button className='pt-25 pb-25 pl-25 pr-25' color='primary'>{translation.all}</Button>
            </Link>}
        />
        <Swiper spaceBetween={16} slidesPerView={slidesPerView}>
          {activitiesList?.map((v, i) => <SwiperSlide key={i}><ActivityCard showUser={false} activity={v} /></SwiperSlide>)}
        </Swiper>
      </PageSection >
    )
  } else {
    return null
  }
}

export default UserPageActivitiesCarousel
