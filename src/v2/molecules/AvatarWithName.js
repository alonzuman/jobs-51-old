import { Avatar, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AvatarWithName = ({ uid, firstName, lastName, imgUrl }) => {
  return (
    <Link to={`/users/${uid}`}>
      <Container>
        <Avatar src={imgUrl} className='avatar__xs'>
          {firstName?.charAt(0)}
        </Avatar>
        <Typography style={{ fontSize: '.6rem' }} variant='subtitle1'>
          {firstName}
        </Typography>
        <Typography style={{ fontSize: '.6rem' }} variant='subtitle1'>
          {lastName}
        </Typography>
      </Container>
    </Link>
  )
}

export default AvatarWithName
