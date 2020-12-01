import { Avatar, Typography } from '@material-ui/core'
import { AvatarGroup, Skeleton } from '@material-ui/lab'
import React from 'react'
import PageSection from '../../../components/atoms/PageSection'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ActivityPageRegionAdmins = ({ regionManagers, loading, region }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection className='mb-1'>
        <Skeleton variant='text' height={16} width={104} className='mb-25' />
        <Skeleton variant='circle' height={36} width={36} />
      </PageSection>
    )
  } else if (regionManagers?.length !== 0) {
    return (
      <PageSection className='mb-1'>
        <Typography variant='subtitle1'>{translation.managersOfRegion} {region}</Typography>
        <AvatarGroup max={4} className='pt-25 pb-25'>
          {regionManagers?.map((v, i) => <Link key={i} to={`/users/${v?.uid}`}><Avatar src={v?.avatar} /></Link>)}
        </AvatarGroup>
      </PageSection>
    )
  } else {
    return null
  }
}

export default ActivityPageRegionAdmins
