import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PageHeader from '../../../v2/organisms/PageHeader'
import { checkPermissions } from '../../../utils';
import { useSelector } from 'react-redux';
import { Avatar, IconButton } from '@material-ui/core';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const UserPageHeader = ({ editing, loading, user, handleEditing, handleImageOpen }) => {
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { avatar, firstName, lastName, serviceYear } = user

  const canEdit = (checkPermissions(role) >= checkPermissions(user?.role) && checkPermissions(user?.role) !== 0)

  if (loading) {
    return (
      <PageHeader
        className='p-1 mt-3'
        title={<Skeleton width={104} />}
        subtitle={<Skeleton width={48} />}
        secondary={<Skeleton variant='circle' height={56} width={56} />}
      />
    )
  } else {
    return (
      <PageHeader
        backButton={!editing}
        imgUrl={user?.avatar}
        className='p-1'
        title={`${firstName} ${lastName}`}
        subtitle={serviceYear ? `${translation.serviceYear} ${serviceYear}` : ''}
        secondary={<Avatar onClick={handleImageOpen} className='avatar__md clickable' src={avatar}>{firstName?.charAt(0)}</Avatar>}
        action={canEdit && <IconButton onClick={handleEditing}>{editing ? <CloseIcon /> : <EditIcon />}</IconButton>}
      />
    )
  }
}

export default UserPageHeader