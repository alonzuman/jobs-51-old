import { Button, CircularProgress, Divider } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../v2/atoms/PageSection'

const JobPageEditActions = ({ handleUpdate, handleDeleting, isUpdating, isDeleting, loading, editing }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <PageSection>
        <Skeleton className='mt-2' width={64} height={18} />
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection>
        <Divider />
        <br />
        <Button
          disabled={isDeleting || isUpdating}
          variant='contained'
          color='primary'
          onClick={handleUpdate}
        >
            {isUpdating ? <CircularProgress className='button-spinner' /> : translation.update}
        </Button>
        <Button
          disabled={isDeleting || isUpdating}
          className='mr-5'
          variant='outlined'
          color='primary'
          onClick={handleDeleting}
        >
            {isDeleting ? <CircularProgress className='button-spinner' /> : translation.deleteJob}
        </Button>
      </PageSection>
    )
  } else {
    return null
  }
}

export default JobPageEditActions
