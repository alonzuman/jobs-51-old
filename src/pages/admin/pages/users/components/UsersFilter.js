import { Button, Dialog, DialogContent } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CustomDialogHeader from '../../../../../v2/molecules/CustomDialogHeader'
import Transition from '../../../../../v2/atoms/Transition'
import NameFilter from './NameFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import DialogActionsContainer from '../../../../../v2/atoms/DialogActionsContainer'
import RegionFilter from './RegionFilter'
import useWindowSize from '../../../../../hooks/useWindowSize'
import RoleFilter from './RoleFilter'
import TopBar from '../../../../../v2/layout/TopBar'
import { UsersFilterContext } from './UsersFilterContext'

const UsersFilter = () => {
  const { translation } = useSelector(state => state.theme)
  const { queryParams, setQueryParams, clearFilters } = useContext(UsersFilterContext)
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()
  const { search } = history.location
  const { windowWidth } = useWindowSize()

  const handleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    const query = qs.parse(search)
    setQueryParams(query)
  }, [search])

  const handleSubmit = e => {
    e.preventDefault()
    const query = qs.stringify(queryParams)

    history.push({
      pathname: '/admin/users',
      search: query
    })

    handleOpen()
  }

  const toggleView = () => {
    const { view } = queryParams;
    const newQuery = {
      ...queryParams,
      view: view === 'list' ? 'table' : 'list'
    }
    const query = qs.stringify(newQuery)
    history.push({
      pathname: '/admin/users',
      search: query
    })
  }

  return (
      <TopBar sticky bottomSpacing={false}>
        <Button size='large' onClick={handleOpen} variant='outlined' className='mobile_full__width'>{translation.filterResults}</Button>
        <Button size='large' className='mr-5 mobile_full__width' variant='outlined' onClick={toggleView}>{translation.changeView}</Button>
        <Dialog dir='rtl' fullScreen={windowWidth <= 768} fullWidth TransitionComponent={Transition} open={isOpen} onClose={handleOpen}>
          <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleOpen} />
          <DialogContent>
            <NameFilter />
            <RegionFilter />
            <RoleFilter />
          </DialogContent>
          <DialogActionsContainer>
            <Button onClick={clearFilters} >{translation.clear}</Button>
            <Button onClick={e => handleSubmit(e)} color='primary' variant='contained'>{translation.apply}</Button>
          </DialogActionsContainer>
        </Dialog>
      </TopBar>
  )
}

export default UsersFilter
