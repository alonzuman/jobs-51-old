import { Button, Dialog, DialogContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import CustomDialogHeader from '../../../../../v2/molecules/CustomDialogHeader'
import Transition from '../../../../../v2/atoms/Transition'
import NameFilter from './NameFilter'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import DialogActionsContainer from '../../../../../v2/atoms/DialogActionsContainer'
import RegionFilter from './RegionFilter'
import useWindowSize from '../../../../../hooks/useWindowSize'
import ChipsGrid from '../../../../../v2/molecules/ChipsGrid'
import { onlyUnique, roles } from '../../../../../utils'
import RoleFilter from './RoleFilter'
import ListIcon from '@material-ui/icons/List';
import TableChartIcon from '@material-ui/icons/TableChart';
import TopBar from '../../../../../v2/layout/TopBar'
import PageSection from '../../../../../v2/atoms/PageSection'

const UsersFilter = ({ view, handleView }) => {
  const { translation } = useSelector(state => state.theme)
  const [isOpen, setIsOpen] = useState(false)
  const history = useHistory()
  const { windowWidth: width } = useWindowSize()
  const [selectedFullName, setSelectedFullName] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [filters, setFilters] = useState([])

  const handleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    const { search } = history.location
    const parsedQuery = qs.parse(search)
    const fullName = parsedQuery.firstName ? `${parsedQuery?.firstName} ${parsedQuery?.lastName}` : null;
    setSelectedFullName(fullName)
    setSelectedRegion(parsedQuery.region)
    setSelectedRole(parsedQuery.role)
    setFilters([
      ...Object.keys(parsedQuery)?.map(v => {
        if (v === 'firstName' || v === 'lastName') {
          return fullName
        } else if ([...roles, 'pending'].includes(parsedQuery[v])) {
          return translation.roles[parsedQuery[v]]
        } else if (v === 'view') {
          return null
        } else {
          return parsedQuery[v]
        }
      })
    ]?.filter(onlyUnique)?.filter(v => v))
  }, [history.location.search])

  const handleSubmit = e => {
    e.preventDefault()
    const query = {
      firstName: selectedFullName ? selectedFullName.split(' ')[0] : '',
      lastName: selectedFullName ? selectedFullName.split(' ')[1] : '',
      region: selectedRegion,
      role: selectedRole,
      view
    }

    setFilters([selectedFullName, selectedRegion])
    const stringifiedQuery = qs.stringify(query)

    history.push({
      pathname: '/admin/users',
      search: stringifiedQuery
    })

    handleOpen()
  }

  const clearFilters = () => {
    setSelectedFullName('')
    setSelectedRegion('')
    setSelectedRole('')
    setSelectedRegion('')
  }

  return (
    <>
      <TopBar sticky bottomSpacing={false}>
        <Button size='large' onClick={handleOpen} variant='outlined' className='mobile_full__width'>{translation.filterResults}</Button>
        <Button size='large' className='mr-5 mobile_full__width' variant='outlined' onClick={handleView}>
          {translation.changeView}
          {view === 'list' && <ListIcon className='mr-5' />}
          {view === 'table' && <TableChartIcon className='mr-5 small__icon' />}
        </Button>
        <Dialog dir='rtl' fullScreen={width <= 768} fullWidth TransitionComponent={Transition} open={isOpen} onClose={handleOpen}>
          <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleOpen} />
          <DialogContent>
            <NameFilter selectedFullName={selectedFullName} setSelectedFullName={setSelectedFullName} />
            <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            <RoleFilter selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
          </DialogContent>
          <DialogActionsContainer>
            <Button onClick={clearFilters} >{translation.clear}</Button>
            <Button onClick={e => handleSubmit(e)} color='primary' variant='contained'>{translation.apply}</Button>
          </DialogActionsContainer>
        </Dialog>
      </TopBar>
      <PageSection>
        <ChipsGrid chips={filters} />
      </PageSection>
    </>
  )
}

export default UsersFilter
