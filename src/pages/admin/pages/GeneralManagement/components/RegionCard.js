import React, { useContext, useState } from 'react'
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { EditRegionsContext } from './EditRegionsContext';
import ApprovalDialog from '../../../../../v2/layout/ApprovalDialog';
import { useSelector } from 'react-redux';

const RegionCard = ({ region }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isDeleting } = useSelector(state => state.constants.locations)
  const { translation } = useSelector(state => state.theme)
  const { isEditing, handleRegionDelete } = useContext(EditRegionsContext)

  const handleIsDeleting = () => setIsOpen(v => !v)

  return (
    <ListItem disableGutters button>
      <ApprovalDialog
        open={isOpen}
        action={() => handleRegionDelete(region)}
        loading={isDeleting}
        text={translation.areYouSure}
        onClose={handleIsDeleting}
      />
      <ListItemText primary={region} />
      {isEditing &&
      <ListItemIcon>
        <IconButton onClick={handleIsDeleting} size='small'>
          <DeleteOutlineIcon />
        </IconButton>
      </ListItemIcon>}
    </ListItem>
  )
}

export default RegionCard
