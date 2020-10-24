import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PageHeader from '../../../v2/organisms/PageHeader'
import { Avatar, TextField, Typography } from '@material-ui/core'
import JobPageHeaderActions from './JobPageHeaderActions'
import styled from 'styled-components'
import LocationSelect from '../../../components/forms/profile/LocationSelect'
import { useSelector } from 'react-redux'

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
  margin-bottom: 32px;
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
  width: 100%;
`

const FlexFields = styled.div`
  display: flex;
  align-items: center;
`

const JobPageHeader = ({ editing, loading, job, handleEditing, company, setCompany, title, setTitle, subtitle, setSubtitle, avatar, setAvatar, ...rest }) => {
  const { translation } = useSelector(state => state.theme)

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
          <Typography className='p-0 lh-0' variant='h1'>{translation.editingJob}</Typography>
          <JobPageHeaderActions editing job={job} handleEditing={handleEditing} />
        </ActionsWrapper>
        <ItemsWrapper>
          <TextContainer>
            <TextField className='mxw-256' label={translation.jobTitle} variant='outlined' value={title} onChange={e => setTitle(e.target.value)} />
            <FlexFields>
              <TextField className='mxw-224 ml-5' label={translation.companyName} variant='outlined' size='small' value={company} onChange={e => setCompany(e.target.value)} />
              <LocationSelect className='mnw-196' label={translation.location} size='small' location={subtitle} setLocation={setSubtitle} />
            </FlexFields>
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
