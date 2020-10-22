import React from 'react'
import { useSelector } from 'react-redux'
import { checkPermissions } from '../../../utils'
import SaveJobButton from '../../../v2/molecules/SaveJobButton'
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';

const ActionsContainer = styled.div`

`

const JobPageHeaderActions = ({ job, handleEditing }) => {
  const { uid, role } = useSelector(state => state.auth)

  if (uid === job?.uid || checkPermissions(role) >= 3) {
    return (
      <ActionsContainer>
        <IconButton onClick={handleEditing}>
          <EditIcon />
        </IconButton>
        <SaveJobButton job={job} />
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
