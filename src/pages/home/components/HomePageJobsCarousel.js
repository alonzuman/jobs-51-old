import { Divider, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CardsSkeletons from '../../../components/skeletons/CardsSkeletons'
import { db } from '../../../firebase'
import JobsCarousel from '../../../v2/organisms/JobsCarousel'

const HomePageJobsCarousel = ({ query, title }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState([])

  const SectionContainer = styled.div`

  `

  const fetchJobs = async () => {
    setIsLoading(true)
    const snapshot = await db.collection('jobs').where(...query).get()
    let results = []
    snapshot.forEach(doc => results.push({ id: doc.id, ...doc.data() }))
    setJobs(results)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (isLoading) {
    return (
      <CardsSkeletons count={1} />
    )
  } else if (jobs?.length !== 0) {
    return (
      <SectionContainer>
        <Divider className='mb-1 mr-1 ml-1' />
        <Typography className='mr-1 ml-1' variant='h2'>{title}</Typography>
        <JobsCarousel jobs={jobs} />
      </SectionContainer>
    )
  } else {
    return null
  }
}

export default HomePageJobsCarousel
