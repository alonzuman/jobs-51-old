import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../actions/users'
import { Avatar, IconButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { checkPermissions } from '../../utils'
import ImageLightbox from '../../components/general/ImageLightbox'

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import PageHeader from '../../v2/organisms/PageHeader'
import UserPageJobInfo from './components/UserPageJobInfo'
import UserPageBio from './components/UserPageBio'
import UserPageBadges from './components/UserPageBadges'
import UserPageJobsCarousel from './components/UserPageJobsCarousel'
import styled from 'styled-components'

const Container = styled.div`
  padding: 16px 0;
  max-width: 768px;
  margin: 0 auto;
`

const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { loading, user } = useSelector(state => state.users)
  const uid = match.url.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.uid !== uid) {
      dispatch(getUser(uid))
    }
  }, [dispatch, uid])

  const handleEditing = () => setEditing(!editing)

  return (
    <Container>
      <PageHeader
        className='p-1'
        backButton
        spaceBottom
        action={checkPermissions(role) >= checkPermissions(user?.role) && <IconButton onClick={handleEditing}>{editing ? <DoneIcon /> : <EditIcon />}</IconButton>}
        title={(!loading && user.firstName) ? `${user?.firstName} ${user?.lastName}` : <Skeleton width={180} />}
        subtitle={(!loading && user) ? user.serviceYear ? `${translation.serviceYear} ${user?.serviceYear}` : "" : <Skeleton width={100} />}
        secondary={!loading ?
          <Avatar onClick={user?.avatar ? () => setImageOpen(true) : null} className="avatar__md clickable" src={user?.avatar} alt={user?.firstName}>
            {user?.firstName?.charAt(0)}
          </Avatar> :
          <Skeleton variant="circle" className="avatar__md" />}
      />
      <UserPageBadges loading={loading} user={user} editing={editing} />
      <UserPageBio editing={editing} user={user} loading={loading} />
      <UserPageJobInfo editing={editing} user={user} loading={loading} />
      <UserPageJobsCarousel editing={editing} user={user} loading={loading} />
      <ImageLightbox
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        imgUrl={user?.avatar}
      />
    </Container>
  );
}

export default User
