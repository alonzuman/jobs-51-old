import React from 'react'
import PageContainer from '../components/layout/PageContainer'
import TopBar from '../components/layout/TopBar'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'

const Events = () => {
  const { translation } = useSelector(state => state.theme)

  return (
    <>
      <TopBar title={translation.events} backButton={true} />
      <PageContainer>
        <Typography variant='h2'>{translation.soon}</Typography>
      </PageContainer>
    </>
  )
}

export default Events
