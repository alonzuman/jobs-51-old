import { Button, Dialog, DialogContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import CustomDialogHeader from '../../../../../components/layout/CustomDialogHeader'
import Transition from '../../../../../v2/atoms/Transition'
import NameFilter from './NameFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import DialogActionsContainer from '../../../../../v2/atoms/DialogActionsContainer'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: ${props => props.background};
  margin-bottom: 8px;
`

const UsersFilter = () => {
  const { theme, translation } = useSelector(state => state.theme)
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()
  const [selectedFullName, setSelectedFullName] = useState('')

  const handleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    const { search } = history.location
    const parsedQuery = qs.parse(search)
    setSelectedFullName(`${parsedQuery?.firstName} ${parsedQuery?.lastName}`)
  }, [history.location.search])

  const handleSubmit = e => {
    e.preventDefault()
    const query = {
      firstName: selectedFullName ? selectedFullName.split(' ')[0] : '',
      lastName: selectedFullName ? selectedFullName.split(' ')[1] : ''
    }

    const stringifiedQuery = qs.stringify(query)

    history.push({
      pathname: '/admin/users',
      search: stringifiedQuery
    })

    handleOpen()
  }

  const clearFilters = () => setSelectedFullName('')

  return (
    <Container background={theme?.palette?.background?.main}>
      <Button onClick={handleOpen} variant='outlined' className='mobile_full__width'>{translation.filterResults}</Button>
      <Dialog dir='rtl' fullWidth TransitionComponent={Transition} open={isOpen} onClose={handleOpen}>
        <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleOpen} />
        <DialogContent>
          <NameFilter selectedFullName={selectedFullName} setSelectedFullName={setSelectedFullName} />
        </DialogContent>
        <DialogActionsContainer>
          <Button onClick={e => handleSubmit(e)} color='primary' variant='contained'>{translation.apply}</Button>
          <Button onClick={clearFilters} variant='outlined'>{translation.clear}</Button>
        </DialogActionsContainer>
      </Dialog>
    </Container>
  )
}

export default UsersFilter
