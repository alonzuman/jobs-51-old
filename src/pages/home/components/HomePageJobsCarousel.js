import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CardsSkeletons from '../../../components/skeletons/CardsSkeletons'
import { db } from '../../../firebase'
import PageSection from '../../../v2/atoms/PageSection'
import JobsCarousel from '../../../v2/organisms/JobsCarousel'
const SectionContainer = styled.div`
  :last-of-type {
    margin-bottom: 96px;
  }
`

const HomePageJobsCarousel = ({ query, title, industry }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState([])


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
      <PageSection>
        <Divider className='mb-1 mr-1 ml-1' />
        <Skeleton height={32} width={224} />
        <CardsSkeletons count={2} />
      </PageSection>
    )
  } else if (jobs?.length !== 0) {
    return (
      <SectionContainer>
        <Divider className='mb-1 mr-1 ml-1' />
        <Typography className='mr-1 ml-1' variant='h2'>{title}{industry}</Typography>
        <JobsCarousel jobs={jobs} />
      </SectionContainer>
    )
  } else {
    return null
  }
}

export default HomePageJobsCarousel
