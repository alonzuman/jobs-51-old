import React from 'react'
import { useSelector } from 'react-redux'
import { checkPermissions } from '../../../utils'
import SaveJobButton from '../../../v2/molecules/SaveJobButton'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const ActionsContainer = styled.div`

`

const JobPageHeaderActions = ({ editing, job, handleEditing }) => {
  const { uid, role } = useSelector(state => state.auth)

  if (uid === job?.uid || checkPermissions(role) >= 3) {
    return (
      <ActionsContainer>
        <IconButton className='mb-1' size='small' onClick={handleEditing}>
          {editing ? <CloseIcon /> : <EditIcon />}
        </IconButton>
        <SaveJobButton className='mb-1' job={job} />
      </ActionsContainer>
    )
  } else {
    return (
      <ActionsContainer>
        <SaveJobButton job={job} />
      </ActionsContainer>
    )
  }
}

export default JobPageHeaderActions
