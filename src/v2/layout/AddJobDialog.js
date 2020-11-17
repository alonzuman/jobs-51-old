import { CircularProgress, Dialog, DialogContent } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AddJob from '../organisms/AddJob'
import CustomDialogHeader from '../molecules/CustomDialogHeader'
import useWindowSize from '../../hooks/useWindowSize'
import useJobsConstants from '../../hooks/useJobsConstants'

const AddJobDialog = ({ open, onClose }) => {
  const { windowWidth } = useWindowSize()
  const { translation } = useSelector(state => state.theme)
  const { isFetching, isFetched } = useJobsConstants()

  return (
    <Dialog fullScreen={windowWidth <= 768} fullWidth dir='rtl' open={open} onClose={onClose}>
      <CustomDialogHeader exitButton onClose={onClose} title={translation.addJob} />
      {isFetching && <CircularProgress color='primary' />}
      {isFetched  && <AddJob onClose={onClose} />}
    </Dialog>
  )
}

export default AddJobDialog
