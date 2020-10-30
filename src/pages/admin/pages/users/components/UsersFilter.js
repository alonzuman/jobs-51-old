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
import RegionFilter from './RegionFilter'
import useWindowSize from '../../../../../hooks/useWindowSize'
import ChipsGrid from '../../../../../v2/molecules/ChipsGrid'
import { onlyUnique, roles } from '../../../../../utils'
import RoleFilter from './RoleFilter'

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

const BarContainer = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`

const UsersFilter = ({ view, handleView }) => {
  const { theme, translation } = useSelector(state => state.theme)
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
    <Container background={theme?.palette?.background?.main}>
      <BarContainer>
        <div className='flex align__center'>
          <Button onClick={handleOpen} variant='outlined' className='mobile_full__width'>{translation.filterResults}</Button>
          <Button className='mr-5 mobile_full__width' variant='outlined' onClick={handleView}>{translation.changeView}</Button>
        </div>
        <ChipsGrid chips={filters} />
      </BarContainer>
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
    </Container>
  )
}

export default UsersFilter
