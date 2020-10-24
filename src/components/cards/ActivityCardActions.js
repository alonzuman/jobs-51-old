import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box } from '@material-ui/core'
import { checkPermissions } from '../../utils'
import { approveActivity, deleteActivity, unApproveActivity } from '../../actions'
import ApprovalDialog from '../../v2/layout/ApprovalDialog'

const ActivityCardActions = ({ activity, handleApproved }) => {
  const [approved, setApproved] = useState(activity.approved)
  const [disabled, setDisabled] = useState(false)
  const [approvalOpen, setApprovalOpen] = useState(false)
  const { role } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleApprove = async () => {
    setDisabled(true)
    await dispatch(approveActivity(activity))
    setApproved(true)
    setDisabled(false)
    handleApproved()
  }

  const handleUnapprove = async () => {
    setDisabled(true)
    await dispatch(unApproveActivity(activity))
    setApproved(false)
    setDisabled(false)
    handleApproved()
  }

  const handleDelete = async () => {
    setDisabled(true)
    await dispatch(deleteActivity(activity))
    setDisabled(false)
  }

  const handleApprovalOpen = () => setApprovalOpen(!approvalOpen)

  const isAdmin = checkPermissions(role) >= 3;

  return (
    <Box className='flex align__center justify__center'>
      {isAdmin && !approved &&
        <Button className='button-style' disabled={disabled} onClick={handleApprove} color='primary'>{translation.approveActivity}</Button>}
      {isAdmin && approved &&
        <Button className='button-style' disabled={disabled} onClick={handleUnapprove} color='default'>{translation.unApproveActivity}</Button>}
      <Button className='button-style' disabled={disabled} onClick={handleApprovalOpen} color='default'>{translation.deleteActivity}</Button>
      <ApprovalDialog
        open={approvalOpen}
        onClose={handleApprovalOpen}
        action={handleDelete}
        text={translation.areYouSure}
      />
    </Box>
  )
}

export default ActivityCardActions
