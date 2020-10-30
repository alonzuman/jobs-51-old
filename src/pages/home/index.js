import { Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ShaldagLogo from '../../ShaldagLogo'
import Container from '../../v2/atoms/Container'
import HomePageJobsCarousel from './components/HomePageJobsCarousel'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AddJobDialog from '../../v2/layout/AddJobDialog'
import AreYouVolunteerDialog from '../../v2/layout/AreYouVolunteerDialog'

const HomeSection = styled.div`
  padding: 16px;

  :first-of-type {
    margin-top: 80px;
  }
`

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
      <AreYouVolunteerDialog />
      <HomeSection className='flex flex__column align__center justify__center'>
        <LogoContainer>
          <ShaldagLogo />
        </LogoContainer>
        <Typography className='mt-1' variant='h1'>{translation.homeText1}</Typography>
        <Typography className='text__center' variant='body1'>{translation.landingPageText1}</Typography>
        <ButtonsContainer>
          <Link to='/jobs'>
            <Button className='mt-1' variant='contained' color='primary'>
              {translation.lookingForAJob}
            </Button>
          </Link>
          <Button onClick={handleAddingJob} className='mt-1 mr-5' variant='outlined' color='primary'>
            {translation.addJob}
          </Button>
        </ButtonsContainer>
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
