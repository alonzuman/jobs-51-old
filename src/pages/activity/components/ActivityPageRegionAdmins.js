import { Avatar, Typography } from '@material-ui/core'
import { AvatarGroup, Skeleton } from '@material-ui/lab'
import React from 'react'
import Container from '../../../v2/atoms/Container'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ActivityPageRegionAdmins = ({ regionManagers, loading, region }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <Container className='pt-0'>
        <Skeleton variant='text' height={16} width={104} className='mb-25' />
        <Skeleton variant='circle' height={36} width={36} />
      </Container>
    )
  } else if (regionManagers?.length !== 0) {
    return (
      <Container className='pt-0'>
        <Typography variant='subtitle1'>{translation.managersOfRegion} {region}</Typography>
        <AvatarGroup max={4} className='pt-25 pb-25'>
          {regionManagers?.map((v, i) => <Link key={i} to={`/users/${v?.uid}`}><Avatar src={v?.avatar} /></Link>)}
        </AvatarGroup>
      </Container>
    )
  } else {
    return null
  }
}

export default ActivityPageRegionAdmins
