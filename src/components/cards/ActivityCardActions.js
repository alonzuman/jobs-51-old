import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { checkPermissions } from '../../utils'
import { approveActivity, deleteActivity, unApproveActivity } from '../../actions'
import ApprovalBox from '../dialogs/ApprovalBox'

const ActivityCardActions = ({ activity }) => {
  const [approved, setApproved] = useState(activity.approved)
  const [disabled, setDisabled] = useState(false)
  const [approvalOpen, setApprovalOpen] = useState(false)
  const { role } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleApprove = () => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)
    dispatch(approveActivity(activity))
    setApproved(true)
  }

  const handleUnapprove = () => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)
    dispatch(unApproveActivity(activity))
    setApproved(false)
  }

  return (
    <Grid container>
      {checkPermissions(role) >= 3 && !approved &&
      <Grid item>
        <Button disabled={disabled} onClick={handleApprove} color='primary'>{translation.approveActivity}</Button>
      </Grid>}
      {checkPermissions(role) >= 3 && approved &&
      <Grid item>
        <Button disabled={disabled} onClick={handleUnapprove} color='default'>{translation.unApproveActivity}</Button>
      </Grid>}
      <Grid item>
        <Button disabled={disabled} onClick={() => setApprovalOpen(true)} color='default'>{translation.deleteActivity}</Button>
      </Grid>
      <ApprovalBox text={translation.areYouSure} open={approvalOpen} setOpen={setApprovalOpen} action={() => dispatch(deleteActivity(activity))} />
    </Grid>
  )
}

export default ActivityCardActions
