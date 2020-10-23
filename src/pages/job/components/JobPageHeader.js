import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PageHeader from '../../../v2/organisms/PageHeader'
import { Avatar, TextField, Typography } from '@material-ui/core'
import JobPageHeaderActions from './JobPageHeaderActions'
import styled from 'styled-components'
import LocationSelect from '../../../components/forms/profile/LocationSelect'

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

`

const JobPageHeader = ({ editing, editingTitle, loading, job, handleEditing, company, setCompany, title, titleLabel, setTitle, subtitle, subtitleLabel, setSubtitle, avatar, setAvatar, ...rest }) => {
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
      <Container spaceBottom={true}>
        <ActionsWrapper>
          <Typography className='p-0 lh-0' variant='h1'>{editingTitle}</Typography>
          <JobPageHeaderActions editing job={job} handleEditing={handleEditing} />
        </ActionsWrapper>
        <ItemsWrapper>
          <TextContainer>
            <TextField label={titleLabel} variant='outlined' value={title} onChange={e => setTitle(e.target.value)} />
            <LocationSelect size='small' location={subtitle} setLocation={setSubtitle} />
          </TextContainer>
        </ItemsWrapper>
      </Container>
    )
  } else {
    return (
      <PageHeader
        backButton
        className='p-1'
        subtitleType='location'
        title={title}
        subtitle={subtitle}
        secondary={<Avatar className='avatar__md clickable' src={avatar}>{company?.charAt(0)}</Avatar>}
        action={<JobPageHeaderActions editing={editing} job={job} handleEditing={handleEditing} />}
        {...rest}
      />
    )
  }
}

export default JobPageHeader
