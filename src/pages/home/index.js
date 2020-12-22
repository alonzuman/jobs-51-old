import { Box, Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Container from '../../components/atoms/Container'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AddJobDialog from '../../components/layout/AddJobDialog'
import ShaldagLogo from '../../assets/art/ShaldagLogo'
import JobsArt from '../../assets/art/JobsArt'
import useWindowSize from '../../hooks/useWindowSize'

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
  const { windowHeight } = useWindowSize();
  const [isAddingJob, setIsAddingJob] = useState(false)

  const handleAddingJob = () => setIsAddingJob(!isAddingJob)

  return (
    <Box height={windowHeight} display='flex' flexDirection='column' maxWidth={768} margin='0 auto' padding={2}>
      <AddJobDialog open={isAddingJob} onClose={handleAddingJob} />
      <HomeSection className='flex flex__column align__center justify__center'>
        <LogoContainer>
          <ShaldagLogo />
        </LogoContainer>
        <Typography className='text__center mxw-512 mt-1' variant='body1'>{translation.homeText2}</Typography>
        <Typography className='text__center mxw-512 mt-1' variant='body1'>{translation.homeText3}</Typography>
        <ButtonsContainer>
          <Link to='/jobs'>
            <Button size='large' className='mt-1' variant='contained' color='primary'>
              {translation.lookingForAJob}
            </Button>
          </Link>
          <Button size='large' onClick={handleAddingJob} className='mt-1 mr-5' variant='outlined' color='primary'>
            {translation.addJob}
          </Button>
        </ButtonsContainer>
        <Box height='100%' maxHeight={256} maxWidth={512} width='100%' bottom={64} right={0} padding={4}>
          <JobsArt />
        </Box>
      </HomeSection>
    </Box>
  )
}

export default Home
