import { Button, CircularProgress, Divider } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import useWindowSize from '../../../hooks/useWindowSize'
import PageSection from '../../../v2/atoms/PageSection'

const ActionsContainer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 99;
  background-color: ${props => props.backgroundColor};
  width: 100%;
  right: 0;
  left: 0;
  padding: 8px 32px 16px 32px;

  @media (width: 375px) {
    padding: 16px 16px 32px 16px;
  }

  @media (min-width: 768px) {
    position: relative;
    padding: 16px;
    background-color: transparent;
  }
`

const JobPageActions = ({ handleUpdate, handleDeleting, isUpdating, isDeleting, loading, editing }) => {
  const { translation, theme } = useSelector(state => state.theme)
  const { windowWidth } = useWindowSize()

  if (loading) {
    return (
      <PageSection>
        <Skeleton className='mt-2' width={64} height={18} />
      </PageSection>
    )
  } else if (!editing) {
    return (
      <ActionsContainer backgroundColor={theme?.palette?.background?.paper}>
        {windowWidth > 768 && <Divider className='mb-1' />}
        <Button className='mobile_full__width' color='primary' variant='contained' size='large'>{translation.contact}</Button>
      </ActionsContainer>
    )
  } else if (editing) {
    return (
      <ActionsContainer backgroundColor={theme?.palette?.background?.paper}>
        {windowWidth > 768 && <Divider className='mb-1' />}
        <Button
          disabled={isDeleting || isUpdating}
          variant='contained'
          color='primary'
          size='large'
          onClick={handleUpdate}
        >
          {isUpdating ? <CircularProgress className='button-spinner' /> : translation.update}
        </Button>
        <Button
          disabled={isDeleting || isUpdating}
          className='mr-5'
          variant='outlined'
          color='primary'
          size='large'
          onClick={handleDeleting}
        >
          {isDeleting ? <CircularProgress className='button-spinner' /> : translation.deleteJob}
        </Button>
      </ActionsContainer>
    )
  } else {
    return null
  }
}

export default JobPageActions
