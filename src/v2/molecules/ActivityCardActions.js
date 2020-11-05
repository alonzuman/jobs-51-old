import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box } from '@material-ui/core'
import { checkPermissions } from '../../utils'
import { approveActivity, deleteActivity, unApproveActivity } from '../../actions'
import ApprovalDialog from '../../v2/layout/ApprovalDialog'
import styled from 'styled-components'

const ActivityCardActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
`

const ActivityCardActions = ({ closeActions, activity, handleApproved }) => {
  const [approved, setApproved] = useState(activity.approved)
  const [disabled, setDisabled] = useState(false)
  const [approvalOpen, setApprovalOpen] = useState(false)
  const { role, avatar, firstName, lastName, uid } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const { isUpdating } = useSelector(state => state.activities.activities)
  const dispatch = useDispatch()
  const admin = {
    avatar,
    firstName,
    lastName,
    uid
  }

  const handleApprove = async () => {
    setDisabled(true)
    await dispatch(approveActivity(activity, admin))
    setApproved(true)
    setDisabled(false)
    handleApproved()
  }

  const handleUnapprove = async () => {
    setDisabled(true)
    await dispatch(unApproveActivity(activity, admin))
    setApproved(false)
    setDisabled(false)
    handleApproved()
  }

  const handleDelete = async () => {
    setDisabled(true)
    await dispatch(deleteActivity(activity))
    setDisabled(false)
    handleApprovalOpen()
    closeActions()
  }

  const handleApprovalOpen = () => setApprovalOpen(!approvalOpen)

  const isAdmin = checkPermissions(role) >= 3;

  return (
    <ActivityCardActionsContainer>
      {isAdmin && !approved &&
        <Button className='button-style' disabled={disabled} onClick={handleApprove} color='primary'>{translation.approveActivity}</Button>}
      {isAdmin && approved &&
        <Button className='button-style' disabled={disabled} onClick={handleUnapprove} color='default'>{translation.unApproveActivity}</Button>}
      <Button className='button-style' disabled={disabled} onClick={handleApprovalOpen} color='default'>{translation.deleteActivity}</Button>
      <ApprovalDialog
        open={approvalOpen}
        loading={isUpdating}
        onClose={handleApprovalOpen}
        action={handleDelete}
        text={translation.areYouSure}
      />
    </ActivityCardActionsContainer>
  )
}

export default ActivityCardActions
