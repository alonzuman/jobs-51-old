import { Avatar, Divider, ListItem, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PageSection from '../../../v2/atoms/PageSection'
import { Link } from 'react-router-dom'

const ListItemContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const UserInfo = styled.div`

`

const JobPageUserDetails = ({ loading, job, editing }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection>
        loading
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection>
        editing
      </PageSection>
    )
  } else {
    return (
      <PageSection>
        <Divider />
        <br />
        <Typography variant='h2'>{translation.whoPostedJob}</Typography>
        <Link to={`/users/${job?.uid}`}>
          <ListItem button>
            <ListItemContent>
              <UserInfo>
                <Typography variant='body1'>{job?.user?.firstName} {job?.user?.lastName}</Typography>
              </UserInfo>
              <Avatar src={job?.user?.avatar} alt={job?.user?.firstName}>{job?.user?.firstName?.charAt(0)}</Avatar>
            </ListItemContent>
          </ListItem>
        </Link>
      </PageSection>
    )
  }
}

export default JobPageUserDetails
