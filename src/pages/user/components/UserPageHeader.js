import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PageHeader from '../../../v2/organisms/PageHeader'
import { checkPermissions } from '../../../utils';
import { useSelector } from 'react-redux';
import { Avatar, IconButton, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components'

// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';


const Container = styled.div`
  display: flex;
  padding: 16px 16px 0px 16px;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: ${props => props.spaceBottom ? '16px' : ''};

  @media (max-width: 768px) {
    margin-top: ${props => props.spaceTop ? '64px' : ''};
  }
`

const ActionsWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const TextContainer = styled.div`
  display: flex;
`

const UserPageHeader = ({
  editing,
  stateFirstName,
  stateLastName,
  stateAvatar,
  setAvatar,
  setLastName,
  setFirstName,
  loading,
  user,
  handleEditing,
  handleImageOpen
}) => {
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
  } else if (editing) {
    return (
      <Container >
        <ActionsWrapper>
          <Typography className='p-0 lh-0' variant='h1'>{translation.editUser}</Typography>
          <IconButton size='small' onClick={handleEditing}>{<CloseIcon />}</IconButton>
        </ActionsWrapper>
        <ItemsWrapper>
          <TextContainer>
            <TextField size='small' className='ml-5' label={translation.editFirstName} variant='outlined' value={stateFirstName} onChange={e => setFirstName(e.target.value)} />
            <TextField size='small' label={translation.editLastName} variant='outlined' value={stateLastName} onChange={e => setLastName(e.target.value)} />
          </TextContainer>
        </ItemsWrapper>
      </Container>
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
        action={canEdit && <IconButton size='small' onClick={handleEditing}>{editing ? <CloseIcon /> : <EditIcon />}</IconButton>}
      />
    )
  }
}

export default UserPageHeader
