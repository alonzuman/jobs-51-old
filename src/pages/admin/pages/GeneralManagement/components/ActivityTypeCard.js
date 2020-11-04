import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ApprovalDialog from '../../../../../v2/layout/ApprovalDialog';
import { deleteActivityType } from '../../../../../actions/constants';

// Icons
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const ActivityTypeCard = ({ activity, isDeleting, isUpdating, isEditing }) => {
  const { translation } = useSelector(state => state.theme)
  const [isDeletingActivityType, setIsDeletingActivityType] = useState(false)
  const dispatch = useDispatch()

  const deleteActivity = () => {
    dispatch(deleteActivityType(activity))
    handleIsDeletingActivityType()
  }

  const handleIsDeletingActivityType = () => setIsDeletingActivityType(!isDeletingActivityType)

  return (
    <ListItem disableGutters button>
      <ApprovalDialog
        open={isDeletingActivityType}
        onClose={handleIsDeletingActivityType}
        action={deleteActivity}
        loading={isDeleting}
        text={translation.areYouSure}
      />
      <ListItemText primary={activity} />
      {isEditing &&
        <ListItemSecondaryAction>
          <IconButton disabled={isUpdating} onClick={handleIsDeletingActivityType} size='small'>
            <DeleteOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>}
    </ListItem>
  )
}

export default ActivityTypeCard
