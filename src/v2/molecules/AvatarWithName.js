import { Avatar, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DisplayName = styled.span`
  font-size: .6rem;
`

const AvatarWithName = ({ uid, firstName, lastName, imgUrl }) => {
  return (
    <Link to={`/users/${uid}`}>
      <Container>
        <Avatar src={imgUrl} className='avatar__xs'>
          {firstName?.charAt(0)}
        </Avatar>
        <Typography variant='subtitle1'>
          <DisplayName>
            {firstName} {lastName}
          </DisplayName>
        </Typography>
      </Container>
    </Link>
  )
}

export default AvatarWithName
