import { Dialog } from '@material-ui/core'
import React from 'react'
import useTheme from '../../hooks/useTheme'
import useWindowSize from '../../hooks/useWindowSize'
import Notifications from '../../pages/Notifications'
import Transition from '../atoms/Transition'
import CustomDialogHeader from '../molecules/CustomDialogHeader'

const NotificationsDialog = ({ isOpen, onClose }) => {
  const { translation } = useTheme();
  const { windowWidth } = useWindowSize();

  return (
    <Dialog dir='rtl' open={isOpen} onClose={onClose} scroll='body' fullScreen={windowWidth <= 768} fullWidth TransitionComponent={Transition}>
      <CustomDialogHeader title={translation.notifications} onClose={onClose} />
      <Notifications />
    </Dialog>
  )
}

export default NotificationsDialog
