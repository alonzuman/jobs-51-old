import { Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ShaldagLogo from '../../ShaldagLogo'
import Container from '../../v2/atoms/Container'
import HomePageJobsCarousel from './components/HomePageJobsCarousel'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AddJobDialog from '../../v2/layout/AddJobDialog'

const HomeSection = styled.div`

`

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Home = () => {
  const { translation } = useSelector(state => state.theme)
  const [isAddingJob, setIsAddingJob] = useState(false)

  const highTechQuery = ['industry', '==', 'הייטק']
  const communicationsQuery = ['industry', '==', 'תקשורת']

  const handleAddingJob = () => setIsAddingJob(!isAddingJob)

  return (
    <Container>
      <AddJobDialog open={isAddingJob} onClose={handleAddingJob} />
      <HomeSection className='p-1'>
        <LogoContainer>
          <ShaldagLogo />
        </LogoContainer>
        <Typography className='mt-1' variant='h1'>{translation.homeText1}</Typography>
        <Typography variant='body1'>{translation.landingPageText1}</Typography>
        <Link className='button-link' to='/jobs'>
          <Button className='mt-1' variant='contained' color='primary'>
            {translation.lookingForAJob}
          </Button>
        </Link>
        <Button onClick={handleAddingJob} className='mt-1 mr-5' variant='outlined' color='primary'>
          {translation.addJob}
        </Button>
      </HomeSection>
      <HomeSection>
        <HomePageJobsCarousel industry={translation.highTech} title={translation.jobOffersInCategory} query={highTechQuery} />
      </HomeSection>
      <HomeSection>
        <HomePageJobsCarousel industry={translation.communications} title={translation.jobOffersInCategory} query={communicationsQuery} />
      </HomeSection>
    </Container>
  )
}

export default Home
