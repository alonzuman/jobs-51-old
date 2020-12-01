import { Avatar, Divider, ListItem, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PageSection from '../../../components/atoms/PageSection'
import { Link } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'
import PageSectionTitle from '../../../components/atoms/PageSectionTitle'

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
        <Skeleton width={144} height={48} />
      </PageSection>
    )
  } else if (editing) {
    return null
  } else {
    return (
      <PageSection>
        <Divider className='mb-1' />
        <PageSectionTitle title={translation.whoPostedJob}/>
        <Link to={`/users/${job?.uid}`}>
          <ListItem className='mb-2' button>
            <ListItemContent>
              <UserInfo>
                <Typography variant='body1'>{job?.user?.firstName} {job?.user?.lastName}</Typography>
                <Typography variant='subtitle1'>{job?.user?.hometown}</Typography>
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
