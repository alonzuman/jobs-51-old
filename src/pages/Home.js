import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from '../actions'
import { Button, Typography } from '@material-ui/core'
import PageContainer from '../components/layout/PageContainer'
import { Link } from 'react-router-dom'
import ShaldagLogo from '../ShaldagLogo'
import AddJobDialog from '../v2/layout/AddJobDialog'

const Home = () => {
  const [isAddingJob, setIsAddingJob] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '70vh'
  }

  const handleAddingJob = () => setIsAddingJob(true)

  return (
    <PageContainer style={containerStyle}>
      <AddJobDialog open={isAddingJob} onClose={() => setIsAddingJob(false)} />
      <ShaldagLogo />
      <Typography className='mt-1' variant='h1'>{translation.homeText1}</Typography>
      <Typography style={{ maxWidth: 768 }} variant='body1'>{translation.landingPageText1}</Typography>
      <div className='mt-2 flex full__width align__center justify__center'>
        <Link className='button-link' to='/jobs'>
          <Button className='button-style' variant='outlined' color='primary'>
            {translation.lookingForAJob}
          </Button>
        </Link>
        <Button className='button-style mr-5' onClick={handleAddingJob} variant='outlined' color='primary'>
          {translation.addJob}
        </Button>
      </div>
      {role === 'admin' &&
      <Link className='button-link mt-5' to='/users'>
        <Button className='button-style' variant='contained' color='primary'>
          {translation.usersLookingForJob}
        </Button>
      </Link>}
    </PageContainer>
  )
}

export default Home
