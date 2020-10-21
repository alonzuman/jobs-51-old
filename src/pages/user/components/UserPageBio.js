import { Divider, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

// Icons
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const Container = styled.div`
  padding: 8px 16px;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const UserPageBio = ({ editing, loading, user }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <Container>
        <Skeleton width={104} height={14} />
        <Skeleton width={104} height={18} />
      </Container>
    )
  } else if (user?.about) {
    return (
      <Container>
        <Typography variant='h2'>{translation.aboutMe}</Typography>
        <Typography variant='body1'>{user?.about}</Typography>
        <br />
        <InfoContainer>
          <MailIcon className='ml-5 small__icon' />
          <Typography variant='body1'>{user?.email}</Typography>
        </InfoContainer>
        <InfoContainer>
          <PhoneIcon className='ml-5 small__icon' />
          <Typography variant='body1'>{user?.phone}</Typography>
        </InfoContainer>
        <InfoContainer>
          <LocationCityIcon className='ml-5 small__icon' />
          <Typography variant='body1'>{user?.preferredLocation}</Typography>
        </InfoContainer>
        <br />
        <Divider />
      </Container>
    )
  } else {
    return null
  }
}

export default UserPageBio
