import React, { useState } from 'react'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Dialog, DialogContent } from '@material-ui/core'
import CustomDialogHeader from '../../layout/CustomDialogHeader'
import TuneIcon from '@material-ui/icons/Tune';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`

const JobsFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { listedLocations, listedSkills } = useSelector(state => state.constants)
  const history = useHistory()

  console.log(listedLocations, listedSkills)

  const updateQuery = query => {
    console.log(query)
  }

  const handleClose = () => setIsOpen(false)

  return (
    <Container>
      <Button className='full__width' color='primary' variant='outlined' onClick={() => setIsOpen(true)}>{translation.filterResults} <TuneIcon className='mr-1' /></Button>
      <Dialog dir='rtl' open={isOpen} onClose={handleClose}>
        <CustomDialogHeader title={'filterResults'} exitButton onClose={handleClose} />
        <DialogContent>
          hi
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default JobsFilter
