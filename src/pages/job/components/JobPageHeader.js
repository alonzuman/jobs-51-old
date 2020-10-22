import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PageHeader from '../../../v2/organisms/PageHeader'
import { Avatar } from '@material-ui/core'
import JobPageHeaderActions from './JobPageHeaderActions'

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
  } else {
    return (
      <PageHeader
        backButton={!editing}
        editing={editing}
        editingTitle={editingTitle}
        className='p-1'
        subtitleType='location'
        title={title}
        titleLabel={titleLabel}
        setTitle={setTitle}
        subtitle={subtitle}
        subtitleLabel={subtitleLabel}
        setSubtitle={setSubtitle}
        secondary={<Avatar className='avatar__md clickable' src={avatar}>{company?.charAt(0)}</Avatar>}
        action={<JobPageHeaderActions editing={editing} job={job} handleEditing={handleEditing} />}
        {...rest}
      />
    )
  }
}

export default JobPageHeader
