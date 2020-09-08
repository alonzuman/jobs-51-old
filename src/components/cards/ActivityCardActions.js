import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Box } from '@material-ui/core'
import { checkPermissions } from '../../utils'
import { approveActivity, deleteActivity, unApproveActivity } from '../../actions'
import ApprovalBox from '../dialogs/ApprovalBox'

const ActivityCardActions = ({ activity, style }) => {
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
  }

  const handleUnapprove = async () => {
    setDisabled(true)
    await dispatch(unApproveActivity(activity))
    setApproved(false)
    setDisabled(false)
  }

  const handleDelete = async () => {
    setDisabled(true)
    await dispatch(deleteActivity(activity))
    setDisabled(false)
  }

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'space-between',
    ...style
  }

  return (
    <Box style={boxStyle}>
      {checkPermissions(role) >= 3 && !approved &&
      <Button className='button-style' disabled={disabled} onClick={handleApprove} color='primary'>{translation.approveActivity}</Button>}
      {checkPermissions(role) >= 3 && approved &&
      <Button className='button-style' disabled={disabled} onClick={handleUnapprove} color='default'>{translation.unApproveActivity}</Button>}
      <Button className='button-style' disabled={disabled} onClick={() => setApprovalOpen(true)} color='default'>{translation.deleteActivity}</Button>
      <ApprovalBox text={translation.areYouSure} open={approvalOpen} setOpen={setApprovalOpen} action={handleDelete} />
    </Box>
  )
}

export default ActivityCardActions
